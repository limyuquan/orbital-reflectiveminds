# ReflectiveMinds

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Docker and Docker Compose. If not, you can download them [here](https://www.docker.com/products/docker-desktop).

## Building and Running the Project

To build and run the project, follow these steps:

1. Open a terminal in the project root directory.

2. Build the Docker images:

```bash
docker-compose build
```

3. Run the Docker container:

```bash
docker-compose up
```

The Flask application will be running at http://localhost:5002 and the React application will be running at http://localhost:3002.
