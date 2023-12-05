'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// Read in the shopping list from our "Database" (weather.json)
const data = require('./data/weather.json');

const app = express();

// middleware
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  console.log('GET /');
  response.send('movies for you');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
