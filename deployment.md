# Deployment Instructions

This document provides instructions for deploying the frontend and backend to production. Note: Only Yu Quan has permissions set up to push to production

## Frontend Deployment

Follow these steps to deploy the frontend:
1. Navigate to the client directory:

```bash
cd client
```

2. Swap out the `.env` file with the correct production API URL.
```bash
REACT_APP_API_URL=https://still-shore-57741-d5ae7f632a61.herokuapp.com/
```
Note: This is non-sensitive information.Hence, can be shown in the readme


3. Deploy the frontend using Vercel:
```bash
vercel .
```

## Backend Deployment

Follow these steps to deploy the backend:

1. Push the `server` directory to Heroku:
```bash
git subtree push --prefix server heroku master
```