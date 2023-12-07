'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./lib/weather');
const getMovies = require('./lib/movies');
const notFound = require('./lib/notFound');
const errorHandler = require('./lib/errorHandler');
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(cors());

// routes
app.get('/weather', getWeather);
app.get('/movie', getMovies);
app.get('*', notFound);
app.use('*', errorHandler); // * represents any type of request at any path

// error handling middleware must be the last app.use()
app.use((error, request, response) => {
  console.error(error);
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
