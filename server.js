'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Read in the shopping list from our "Database" (weather.json)
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors());

// routes

async function getWeather(request, response) {
  const { lat, lon, searchQuery } = request.query;
  const cityInfo = findCityInfo(lat, lon, searchQuery);
  //   console.log(cityInfo);

  if (!cityInfo) {
    // No matching city found
    response.status(404).send('City not found');
    return;
  }

  const cityForecasts = cityInfo.data.map(
    (element) =>
      new Forecast(
        element.datetime,
        element.low_temp,
        element.max_temp,
        element.weather.description
      )
  );
  //   console.log(cityForecasts);
  // Use toJSON to serialize each Forecast instance
  const serializedForecasts = cityForecasts.map((forecast) =>
    forecast.toJSON()
  );
  response.status(200).json(serializedForecasts);
  console.log(serializedForecasts);
}

app.get('/weather', getWeather);
app.get('*', notFound);
app.use('*', errorHandler);

// Helper Functions

function findCityInfo(lat, lon, searchQuery, tolerance = 0.1) {
  return weatherData.find((city) => {
    const latDiff = Math.abs(parseFloat(city.lat) - parseFloat(lat));
    const lonDiff = Math.abs(parseFloat(city.lon) - parseFloat(lon));
    const latMatch = latDiff <= tolerance;
    const lonMatch = lonDiff <= tolerance;
    const searchQueryMatch =
      city.city_name.toLowerCase() === searchQuery.toLowerCase();
    if (latMatch && lonMatch && searchQueryMatch) {
      return city;
    }
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

// Your error-handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// app.get('/throw-an-error', (request, response, next) => {
//   try {
//     // Simulate an error by throwing an exception
//     throw new Error('You did something really, really bad!');
//   } catch (error) {
//     // Pass the error to the next middleware
//     next(error);
//   }
// });

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
