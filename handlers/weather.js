const axios = require('axios');
const cache = require('../cache');
const convertToPacificTime = require('../components/timeConverter');
const isCacheValid = require('../components/isCacheValid');

module.exports = async function getWeather(request, response) {
  const { lat, lon } = request.query;
  const key = `weather-${lat}${lon}`;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5`;

  if (cache[key] && isCacheValid(cache[key])) {
    console.log('fetching from cache - cache hit');
    let timeSinceLastFetch = Date.now() - cache[key].timestamp;
    console.log('seconds since last fetch:', timeSinceLastFetch / 1000);
    console.log(cache[key]);

    response.status(200).json(cache[key]);
  } else {
    console.log('fetching from API');

    try {
      const weatherResponse = await axios.get(weatherUrl);
      console.log('city name searched:', weatherResponse.data.city_name);

      const cityForecasts = weatherResponse.data.data.map(
        (element) =>
          new Forecast(
            element.datetime,
            element.low_temp,
            element.max_temp,
            element.weather.description
          )
      );

      const timestamp = Date.now();
      const pacificTimeString = convertToPacificTime(timestamp);

      cache[key] = {
        timestamp: timestamp,
        PTfetch: pacificTimeString,
        data: cityForecasts,
      };
      response.status(200).json(cache[key]);
      console.log(cache[key]);
    } catch (error) {
      // Handle errors, log them, and send an appropriate response
      console.error(error);
      response.status(500).send('Internal Server Error');
    }
  }
};

// class
class Forecast {
  constructor(date, low, high, weather) {
    this.date = date;
    this.low = low;
    this.high = high;
    this.weather = weather;
    this.description = `Low of ${low}, high of ${high}, with ${weather}`;
  }
}


