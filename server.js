'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { element } = require('prop-types');
// Read in the shopping list from our "Database" (weather.json)
// const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors());

// routes
app.get('/weather', getWeather);
app.get('/movie', getMovies);
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

async function getMovies(request, response) {
  const { searchQuery: searchQuery } = request.query;

  // Check if searchQuery is missing
  if (!searchQuery) {
    response.status(400).send('Bad Request: Missing searchQuery parameter');
    return;
  }

  const movieAPIurl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`;

  try {
    const movieResponse = await axios.get(movieAPIurl);
    const rawMovieData = movieResponse.data.results;
    const movieArray = rawMovieData.map(element => new Movie(element));
    console.log(movieArray);
    response.status(200).json(movieArray);

  } catch (error) {
    console.log(error);
    response.status(500).send('Internal Server Error');
  }
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

class Movie {
  constructor(data) {
    this.title = data.title;
    this.overview = data.overview;
    this.average_votes = data.vote_average.toFixed(2); // Limit to 2 decimal places
    this.total_votes = data.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    this.popularity = data.popularity.toFixed(4); // Limit to 4 decimal places
    this.released_on = data.release_date;
  }

}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
