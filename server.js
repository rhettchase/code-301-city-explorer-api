'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./handlers/weather');
const getMovies = require('./handlers/movies');
const getFood = require('./handlers/food');
const notFound = require('./handlers/notFound');
const errorHandler = require('./handlers/errorHandler');
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors());

// routes
app.get('/weather', getWeather);
app.get('/movie', getMovies);
app.get('/yelp', getFood);
app.get('*', notFound);
app.use('*', errorHandler); // * represents any type of request at any path

// error handling middleware must be the last app.use()
app.use((error, request, response) => {
  console.error(error);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
