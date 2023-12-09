const axios = require('axios');
const cache = require('../cache');
const convertToPacificTime = require('../components/timeConverter');
const isCacheValid = require('../components/isCacheValid');

const headers = {
  Authorization: `Bearer ${process.env.YELP_API_KEY}`,
};

module.exports = async function getFood(request, response) {
  const { searchQuery: searchQuery } = request.query;
  const key = `food-${searchQuery}`;
  const yelpAPIurl = `https://api.yelp.com/v3/businesses/search?term=restaurant&location=${searchQuery}`;

  if (cache[key] && isCacheValid(cache[key])) {
    console.log('fetching from cache - cache hit');
    let timeSinceLastFetch = Date.now() - cache[key].timestamp;
    console.log('seconds since last fetch:', timeSinceLastFetch / 1000);
    console.log(cache[key]);

    response.status(200).json(cache[key]);
  } else {
    console.log('fetching from API');

    try {
      const foodResponse = await axios.get(yelpAPIurl, { headers });
      const rawRestData = foodResponse.data.businesses;
      const restaurantArr = rawRestData.map(
        (element) => new Restaurant(element)
      );

      const timestamp = Date.now();
      const pacificTimeString = convertToPacificTime(timestamp);

      cache[key] = {
        timestamp: timestamp,
        PTfetch: pacificTimeString,
        data: restaurantArr,
      };
      console.log(cache[key]);
      response.status(200).json(cache[key]);
    } catch (error) {
      console.log(error.response.data);
      response.status(500).send('Internal Server Error');
    }
  }
};

// class
class Restaurant {
  constructor(data) {
    // Extracting relevant data from the API response
    this.name = data.name;
    this.image_url = data.image_url;
    this.review_count = data.review_count;
    this.categories = data.categories
      .map((category) => category.title)
      .join(', ');
    this.rating = data.rating;
    this.coordinates = data.coordinates;
    this.location = {
      address: data.location.address1,
      city: data.location.city,
      zip_code: data.location.zip_code,
    };
  }
}
