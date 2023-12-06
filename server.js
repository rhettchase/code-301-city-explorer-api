'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Read in the shopping list from our "Database" (weather.json)
const weatherData = require('./data/weather.json');

const app = express();

// middleware
app.use(cors());

const PORT = process.env.PORT || 3001;

class Forecast {
  constructor(date, low, high, weather) {
    this.date = date;
    this.low = low;
    this.high = high;
    this.weather = weather;
    this.description = `Low of ${low}, high of ${high} with ${weather}`;
  }
}

function findCityInfo(lat, lon, searchQuery) {
  return weatherData.find((city) => {
    const latMatch = city.lat === lat.toString();
    const lonMatch = city.lon === lon.toString();
    const searchQueryMatch =
      city.city_name.toLowerCase() === searchQuery.toLowerCase();
    if (latMatch && lonMatch && searchQueryMatch) {
      return city;
    }
  });
}

app.get('/weather', (request, response) => {
  const { lat, lon, searchQuery } = request.query;
  const cityInfo = findCityInfo(lat, lon, searchQuery);
  //   console.log(cityInfo);
  const cityForecasts = cityInfo.data.map(
    (element) =>
      new Forecast(
        element.datetime,
        element.low_temp,
        element.max_temp,
        element.weather.description
      )
  );
  console.log(cityForecasts);
  response.json(cityForecasts);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
