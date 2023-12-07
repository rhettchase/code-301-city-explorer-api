# City Explorer API

**Author**: Rhett Chase
<!--increment the patch/fix version number if you make more commits past your first submission -->
**Version**: 1.0.0

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
Application is the back-end API for City Explorer. It will take in a request (city search query) from the client and return data (weather forecast) based on the request.  

The application features a custom API server, which provides data for the City Explorer front-end application. This means users will get to see not only the map, but also interesting information about the area, provided by a variety of third-party APIs that the server manages.

The application features live weather and movie data in response to City Explorer searches. This data comes from third-party APIs, which are hosted on a custom back-end API server. The web client will make a request to your custom API server, which will in turn use the key to make a request to the data API. When the server gets the data back,it is sent back to the web client and rendered on the front-end.

[Deployed Site](https://city-explorer-rhett.netlify.app)

### User Input

- `searchQuery`: City Name searched

### LocationIQ Query parameters (used to fetch latitude, longitude, map render)

- `searchQuery`: City Name searched

### Weather Query parameters

- `lat`: Latitude of the city searched
- `lon`: Longitude of the city searched

### Outputs

- Rendered map based on city input from user form
- City's forecast
- Movies with the city's name
- Error messages

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

The deployed site will run "as is" with no need to install additional dependencies. The front-end is hosted on Nelify with installed environment variable for the LocationIQ API. The back-end is hosted on a custom API server, which provides data for the City Explorer front-end application.

### Install/Confirm Dependencies for Development Use

- `node`
- `npm install express`
- `npm install dotenv`
- `npm install cors`
- `npm install axios`
- review/confirm dependencies on `package.json`
- `WeatherBit` API token
- `MovieDB` API token
- Create an `.env` file: Your API key goes here for local development. Make sure this file is in your `.gitignore`.

### Set-up server in server.js

- create `.env` file and add `PORT` variable `PORT=3001`
- add API keys for `WeatherBit` API and `MovieDB` API to `.env` file

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
- Express.JS
- Node.JS
- React.JS
- Bootstrap
- Javascript
- HTML
- CSS

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->
- 12-05-2023 Application now has a fully-functional express server which is hosted locally, with a GET route for the location and weather resource.
- 12-06-2023 Application now has a fully-functional express server which is hosted externally on Render, with a GET route for the location, weather, and movie resources. The site is deployed from an externally hosted custom server. Users can now access the City Explorer application on the web, and explore from anywhere.
- 12-07-2023 Application has been refactored to modularize the back-end codebase.

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
- chatGPT
- WeatherBit API
- LocationIQ API
- MovieDB API
- Render (for hosting server)
- Nelify (for hosting front-end)

## Time Estimates Lab-07

### Weather Placeholder Back-end Static API

Estimate of time needed to complete: 2 hrs
Start time: 2 pm
Finish time: 5 pm
Actual time needed to complete: 3 hrs

### Error Handling

Estimate of time needed to complete: 1 hr
Start time: 9 pm
Finish time: 10 pm
Actual time needed to complete: 1 hr

## Time Estimates Lab-08

### Weather Back-end Live API

Estimate of time needed to complete: 2 hrs
Start time: 130 pm
Finish time: 4 pm
Actual time needed to complete: 2.5 hrs

### Movies Back-end Live API

Estimate of time needed to complete: 2 hrs
Start time: 430 pm
Finish time: 630 pm
Actual time needed to complete: 2 hrs

### Publish server

Estimate of time needed to complete: 1 hr
Start time: 6 pm
Finish time: 7 pm
Actual time needed to complete: 1 hr

## Time Estimate Lab-09

### Refactor: Modularize the back-end codebase

Estimate of time needed to complete: 1 hr
Start time: 2 pm
Finish time: 2:30 pm
Actual time needed to complete: 30 min
