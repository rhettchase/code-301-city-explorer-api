'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
// Read in the shopping list from our "Database" (weather.json)
// const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors());

// routes
app.get('/weather', getWeather);
app.get('*', notFound);
app.use('*', errorHandler);

// Helper Functions

async function getWeather(request, response) {
  const { lat, lon } = request.query;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  try {
    const weatherResponse = await axios.get(weatherUrl);
    console.log(weatherResponse.data.city_name);
    const cityForecasts = weatherResponse.data.data.map(
      (element) =>
        new Forecast(
          element.datetime,
          element.low_temp,
          element.max_temp,
          element.weather.description
        )
    );
    response.status(200).json(cityForecasts);
  } catch (error) {
    // Handle errors, log them, and send an appropriate response
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
}

function findCityInfo(apiResponse, lat, lon, searchQuery, tolerance = 0.1) {
  
}

function xfindCityInfo(apiResponse, lat, lon, searchQuery, tolerance = 0.1) {
  const data = apiResponse.data.data; // Access the 'data' property
  // console.log('API Response Data:', data); // Log data to help debug

  // Ensure data is an array before using the find method
  if (!Array.isArray(data)) {
    return null;
  }

  return data.find((city) => {
    if (!city) {
      return false; // Skip undefined cities
    }

    const latDiff = Math.abs(parseFloat(city.lat) - parseFloat(lat));
    const lonDiff = Math.abs(parseFloat(city.lon) - parseFloat(lon));
    const latMatch = latDiff <= tolerance;
    const lonMatch = lonDiff <= tolerance;

    // Check if city_name is present before comparing
    const searchQueryMatch =
      city.city_name &&
      city.city_name.toLowerCase() === searchQuery.toLowerCase();
    return searchQueryMatch;
    // return latMatch && lonMatch && searchQueryMatch;
  });
}

// Error handling
function notFound(request, response) {
  response.status(404).send('The page you are looking for is not there');
}

function errorHandler(error, request, response, next) {
  console.error(error.stack);
  response.status(500).send('something went wrong ' + error.message);
}

// error handling middleware must be the last app.use()
app.use((error, request, response) => {
  console.error(error);
  response.status(500).send(error.message);
});

// class
class Forecast {
  constructor(date, low, high, weather) {
    this.date = date;
    this.low = low;
    this.high = high;
    this.weather = weather;
    this.description = `Low of ${low}, high of ${high} with ${weather}`;
  }

  toJSON() {
    return {
      date: this.date,
      low: this.low,
      high: this.high,
      weather: this.weather,
      description: this.description,
    };
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
