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

The Flask application will be running at http://localhost:5002 and the React application will be running at http://localhost:3000.

## Branching

Label Branch I(Issue Number), for example if issue is Issue 3, Branch name will be I3


Merge request can be self approved if no merge conflict


## Handling Branches That Are Behind Main

If your branch is behind the main branch, you'll need to rebase it. Here's how you can do that:

1. First, check out to main branch:

```bash
git checkout main
```

2. Pull latest changes from the repo
```bash
git pull
```

3. Checkout to your branch
```bash
git checkout I{Issue Number}
```

4. Merge with missing-if-branch
```bash
git merge main
```

5. Resolve conflicts

