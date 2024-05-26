const express = require('express');
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');
require('dotenv').config();
const { OpenAI } = require('openai');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./passportSetup');
const authRoute = require('./routes/auth');

const app = express();
const port = 5000;

const openai = new OpenAI({
  key: process.env.OPENAI_API_KEY,
});

const systemPrompt = process.env.chatText;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY; 
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_API_KEY;  // Add your Google Maps API Key here

app.use(cors());
app.use(express.json());

app.use(cookieSession({
    name: 'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 100,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/chat', async (req, res) => {
  try {
    const { country, city, days, purpose, kids, date } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `${req.body.country} - ${req.body.city}-${req.body.days}-${req.body.purpose}-${req.body.kids}`,
        },
      ],
    });

    let advices = completion.choices[0].message.content;

    // Log the raw response content
    console.log('Raw response content from OpenAI API:', advices);

    // Parsing the response content safely
    try {
      advices = JSON.parse(advices);
    } catch (parseError) {
      console.error('Failed to parse response content:', parseError);
      throw new Error('Invalid response format from OpenAI API');
    }

    // Check if advices.option is defined and is an array
    if (!advices.option || !Array.isArray(advices.option)) {
      throw new Error('Invalid response format from OpenAI API');
    }

    // Function to fetch photo URL and geolocation from Travel Advisor
    const fetchPhotoAndLocation = async (query) => {
      const travelAdvisorOptions = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
        params: {
          query: query,
          lang: 'en_US',
          units: 'km',
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      };

      try {
        const travelAdvisorResponse = await axios.request(travelAdvisorOptions);
        const results = travelAdvisorResponse.data.data.Typeahead_autocomplete.results;
        
        // Log results to inspect the structure
        console.log(`Results for query "${query}":`, JSON.stringify(results, null, 2));

        let photoUrl = null;
        let latitude = null;
        let longitude = null;

        if (results.length > 0) {
          const result = results[0];

          if (result.image && result.image.photo && result.image.photo.photoSizes && result.image.photo.photoSizes.length > 0) {
            photoUrl = result.image.photo.photoSizes[0].url;
          }

          if (result.detailsV2 && result.detailsV2.geocode) {
            latitude = result.detailsV2.geocode.latitude;
            longitude = result.detailsV2.geocode.longitude;
          }
        }

        console.log(`Query: ${query}, Photo URL: ${photoUrl}, Latitude: ${latitude}, Longitude: ${longitude}`);
        return { photoUrl, latitude, longitude };
      } catch (error) {
        console.error(`Failed to fetch data for query: ${query}`, error);
        return { photoUrl: null, latitude: null, longitude: null };
      }
    };

    // Fetch photos and locations for each option
    for (const option of advices.option) {
      const otelData = await fetchPhotoAndLocation(option.otel);
      option.otelPhotoUrl = otelData.photoUrl;
      option.otelLatitude = otelData.latitude;
      option.otelLongitude = otelData.longitude;

      const kahveData = await fetchPhotoAndLocation(option.kahve);
      option.kahvePhotoUrl = kahveData.photoUrl;
      option.kahveLatitude = kahveData.latitude;
      option.kahveLongitude = kahveData.longitude;

      const restaurantData = await fetchPhotoAndLocation(option.restaurant);
      option.restaurantPhotoUrl = restaurantData.photoUrl;
      option.restaurantLatitude = restaurantData.latitude;
      option.restaurantLongitude = restaurantData.longitude;

      const museumData = await fetchPhotoAndLocation(option.museum);
      option.museumPhotoUrl = museumData.photoUrl;
      option.museumLatitude = museumData.latitude;
      option.museumLongitude = museumData.longitude;
    }

    // Function to fetch weather data from WeatherAPI
    const fetchWeatherData = async (city, country, days, startDate) => {
      const weatherData = [];
      for (let i = 0; i < days; i++) {
        const date = moment(startDate).add(i, 'days').format('YYYY-MM-DD');
        const weatherApiOptions = {
          method: 'GET',
          url: `http://api.weatherapi.com/v1/future.json`,
          params: {
            key: WEATHER_API_KEY,
            q: `${city},${country}`,
            dt: date,
          },
        };

        try {
          const weatherApiResponse = await axios.request(weatherApiOptions);
          console.log(
            `Weather API Response Data for ${date}:`,
            weatherApiResponse.data
          ); // Log the response data for debugging
          const forecast = weatherApiResponse.data.forecast.forecastday[0];
          weatherData.push({
            [`day${i + 1}weather`]: {
              date: forecast.date,
              temperature: forecast.day.avgtemp_c,
              weather: forecast.day.condition.text,
              icon: forecast.day.condition.icon, // Add the icon URL
            },
          });
        } catch (error) {
          console.error(
            `Failed to fetch weather data for ${city}, ${country} on ${date}`,
            error
          );
        }
      }
      return weatherData;
    };

    // Fetch weather data for the specified city and country
    const weatherData = await fetchWeatherData(city, country, days, date);

    // Flatten the weather data into a single object
    const weatherObject = weatherData.reduce((acc, dayWeather) => {
      const dayKey = Object.keys(dayWeather)[0];
      acc[dayKey] = dayWeather[dayKey];
      return acc;
    }, {});

    advices.weather = weatherObject;

    // Fetch distances and durations from Google Maps Distance Matrix API
    const fetchDistancesAndDurations = async (locations) => {
      const origins = locations.map(loc => `${loc.latitude},${loc.longitude}`).join('|');
      const destinations = origins;  // Since we want all pairwise distances

      const distanceMatrixOptions = {
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
        params: {
          key: GOOGLE_MAPS_API_KEY,
          origins: origins,
          destinations: destinations,
          mode: 'walking',  // or 'driving', 'bicycling', etc.
        },
      };

      try {
        const response = await axios.request(distanceMatrixOptions);
        const { rows } = response.data;

        const distances = [];
        for (let i = 0; i < rows.length; i++) {
          const elements = rows[i].elements;
          for (let j = 0; j < elements.length; j++) {
            distances.push({
              from: locations[i].name,
              to: locations[j].name,
              distance: elements[j].distance.text,
              duration: elements[j].duration.text,
            });
          }
        }

        return distances;
      } catch (error) {
        console.error('Failed to fetch distances and durations', error);
        return [];
      }
    };

    // Fetch distances and durations for each option
    for (const option of advices.option) {
      const locations = [
        { name: option.otel, latitude: option.otelLatitude, longitude: option.otelLongitude },
        { name: option.kahve, latitude: option.kahveLatitude, longitude: option.kahveLongitude },
        { name: option.restaurant, latitude: option.restaurantLatitude, longitude: option.restaurantLongitude },
        { name: option.museum, latitude: option.museumLatitude, longitude: option.museumLongitude },
      ];

      const distances = await fetchDistancesAndDurations(locations);
      option.distances = distances;
    }

    console.log(
      'Final Advices with Photos, Locations, Weather, and Distances:',
      JSON.stringify(advices, null, 2)
    );
    res.json(advices);
  } catch (error) {
    if (error.response) {
      console.error(
        `API responded with status ${error.response.status}: ${error.response.data.message}`
      );
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
