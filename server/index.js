const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const { OpenAI } = require("openai");
const  passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passportSetup");
const authRoute = require("./routes/auth");

const app = express();
const port = 5000;

const openai = new OpenAI({
  key: process.env.OPENAI_API_KEY,
});

const systemPrompt = process.env.chatText;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

app.use(cors());
app.use(express.json());

app.use(cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/chat", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `${req.body.country} - ${req.body.city}-${req.body.days}-${req.body.purpose}-${req.body.kids}`,
        },
      ],
    });

    let advices = completion.choices[0].message.content;

    // Log the raw response content
    console.log("Raw response content from OpenAI API:", advices);

    // Parsing the response content safely
    try {
      advices = JSON.parse(advices);
    } catch (parseError) {
      console.error("Failed to parse response content:", parseError);
      throw new Error("Invalid response format from OpenAI API");
    }

    // Check if advices.option is defined and is an array
    if (!advices.option || !Array.isArray(advices.option)) {
      throw new Error("Invalid response format from OpenAI API");
    }

    // Function to fetch photo URL and geolocation from Travel Advisor
    const fetchPhotoAndLocation = async (query) => {
      const travelAdvisorOptions = {
        method: "GET",
        url: "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete",
        params: {
          query: query,
          lang: "en_US",
          units: "km",
        },
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      };

      try {
        const travelAdvisorResponse = await axios.request(travelAdvisorOptions);
        const results = travelAdvisorResponse.data.data.Typeahead_autocomplete.results;
        const photoUrl = results.length > 0 ? results[0].image.photo.photoSizes[0].url : null;
        const latitude = results.length > 0 ? results[0].detailsV2.geocode.latitude : null;
        const longitude = results.length > 0 ? results[0].detailsV2.geocode.longitude : null;
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

    console.log("Final Advices with Photos and Locations:", JSON.stringify(advices, null, 2));
    res.json(advices);
  } catch (error) {
    if (error.response) {
      console.error(`API responded with status ${error.response.status}: ${error.response.data.message}`);
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
