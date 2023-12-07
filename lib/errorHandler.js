function errorHandler(error, request, response, next) {
  console.error(error.stack);
  response.status(500).send('something went wrong ' + error.message);
}

module.exports = errorHandler;
