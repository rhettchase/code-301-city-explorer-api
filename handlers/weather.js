const axios = require('axios');
const cache = require('../cache');

module.exports = async function getWeather(request, response) {
  const { lat, lon } = request.query;
  const key = `weather-${lat}${lon}`;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=5`;

  if (cache[key]) {
    console.log('fetching from cache');
    response.status(200).json(cache[key].data);
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

      cache[key] = {
        timestamp: Date.now(),
        data: cityForecasts,
      };
      response.status(200).json(cityForecasts);
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
