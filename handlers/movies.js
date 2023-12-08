const axios = require('axios');
const cache = require('../cache');
const convertToPacificTime = require('../components/timeConverter');
const isCacheValid = require('../components/isCacheValid');

module.exports = async function getMovies(request, response) {
  const { searchQuery: searchQuery } = request.query;
  const key = `movies-${searchQuery}`;
  const movieAPIurl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIE_API_KEY}`;

  // Check if searchQuery is missing
  if (!searchQuery) {
    response.status(400).send('Bad Request: Missing searchQuery parameter');
    return;
  }

  if (cache[key] && isCacheValid(cache[key])) {
    console.log('fetching from cache - cache hit');
    let timeSinceLastFetch = Date.now() - cache[key].timestamp;
    console.log('seconds since last fetch:', timeSinceLastFetch / 1000);
    console.log(cache[key]);

    response.status(200).json(cache[key].data);
  } else {
    console.log('fetching from API');

    try {
      const movieResponse = await axios.get(movieAPIurl);
      const rawMovieData = movieResponse.data.results;
      const movieArray = rawMovieData.map((element) => new Movie(element));

      const timestamp = Date.now();
      const pacificTimeString = convertToPacificTime(timestamp);

      cache[key] = {
        timestamp: timestamp,
        PTfetch: pacificTimeString,
        data: movieArray
      };
      console.log(cache[key]);
      response.status(200).json(movieArray);
    } catch (error) {
      console.log(error);
      response.status(500).send('Internal Server Error');
    }
  }
};

class Movie {
  constructor(data) {
    this.title = data.title;
    this.overview = data.overview;
    this.average_votes = data.vote_average.toFixed(2); // Limit to 2 decimal places
    this.total_votes = data.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    this.popularity = data.popularity.toFixed(2); // Limit to 2 decimal places
    this.released_on = data.release_date;
  }
}
