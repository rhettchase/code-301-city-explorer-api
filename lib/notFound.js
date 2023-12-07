function notFound(request, response) {
  response.status(404).send('The page you are looking for is not there');
}

module.exports = notFound;
