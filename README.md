# City Explorer API

**Author**: Rhett Chase
<!--increment the patch/fix version number if you make more commits past your first submission -->
**Version**: 1.0.0

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
Application is the back-end API for City Explorer. It will take in a request (city search query) from the client and return data (weather forecast) based on the request. The front-end also uses an third-party API (LocationIQ) to fetch map data based on the city name.

[Deployed Site](https://city-explorer-rhett.netlify.app)

### User Input

- `searchQuery`: City Name searched

### LocationIQ Query parameters (used to fetch latitude, longitude, map render)

- `searchQuery`: City Name searched

### Weather Query parameters

- `lat`: Latitude of the city searched
- `lon`: Longitude of the city searched
- `searchQuery`: City Name searched

### Outputs

- Rendered map based on city input from user form
- City's forecast
- Error messages

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

### Install/Confirm Dependencies

- `node`
- `npm install express`
- `npm install dotenv`
- `npm install cors`
- review/confirm dependencies on `package.json`

### Set-up server in server.js

- create `.env` file and add `PORT` variable `PORT=3001`

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
12-05-2023 Application now has a fully-functional express server, with a GET route for the location and weather resource.

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
- chatGPT

## Time Estimates

### Weather Placeholder Back-end API

Estimate of time needed to complete: 2 hrs
Start time: 2 pm
Finish time: 5 pm
Actual time needed to complete: 3 hrs

### Weather Placeholder Front-end

Estimate of time needed to complete: 2 hrs
Start time: 5 pm
Finish time: 8 pm
Actual time needed to complete: 3 hrs

### Error Handling

Estimate of time needed to complete: 1 hr
Start time: 9 pm
Finish time: 10 pm
Actual time needed to complete: 1 hr
