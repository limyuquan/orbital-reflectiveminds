# Reflective Minds Front-End Client

This folder contains the front-end code for the Reflective Minds project. It is built using React, a popular JavaScript library for building user interfaces.

## Project Structure

The project is structured as follows:

- `App.js`: This is the main entry point of the application. It contains the router logic that determines which component to render based on the current path.

- `components/`: This directory contains all the React components used in the application. Each feature of the application (e.g., dashboard, entry, login) has its own subdirectory under `components/`.

    - `dashboard/`: This directory contains the components and CSS for the dashboard feature.


Each feature directory contains the following:

- `ComponentName.js`: This is the main component file for the feature. It contains the React component that renders the feature.
- `ComponentName.css`: This is the CSS file for the feature. It contains the styles for the component.

## Running the Front-End Client

You can use the docker instructions found in the main README to run both the frontend and backend locally

The application will be available at http://localhost:3000
