// distanceMatrixHelper.js
import axios from 'axios';

export const getDistanceAndDuration = async (origins, destinations, travelMode) => {
  try {
    const response = await axios.get('http://localhost:5000/distancematrix', {
      params: {
        origins: origins.join('|'),
        destinations: destinations.join('|'),
        mode: travelMode,
      },
    });

    if (response.data.status === 'OK') {
      const elements = response.data.rows[0].elements[0];
      return {
        distance: elements.distance.text,
        duration: elements.duration.text,
      };
    } else {
      console.error('Distance Matrix API error:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('API call error:', error);
    return null;
  }
};
