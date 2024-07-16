# Send-wich_app

Repository for the 2024 Software Engineering project

## Project Members

- Carpella Luca
- Eccel Niccolò
- Tomè Andrea
- Zini Tommaso

# Deployment

## Backend

The backend server is deployed on Render. Any changes to the 'main' branch will trigger an automatic deployment.
The frontend interacts with the backend API's hosted at https://send-which-app.onrender.com

## Frontend

The frontend application is deployed on Netlify. Any changes to the 'main' branch will trigger an automatic deployment.
Try out the application at https://send-which-app.netlify.app

# API Documentation

The API's documentation is always available at https://send-which-app.onrender.com/api-docs

# Run The Application Locally:

## Server Build Setup

Enter the back-end directory and run the following commands

```bash
# Install Dependencies
npm install
# Install Dependencies For Development
npm install --include=dev

# Run Server Initializing And Populating The Database
# The database collections are populated with mock data
npm run dev:init

# Before running the application for the first time, initialize the database

# Run Server
npm run dev

# Run Tests
npm run test
```

## Frontend Build Setup

Enter the front-end directory and run the following commands

```bash
# Install Dependencies
npm install
# Install Dependencies For Development
npm install --include=dev

# Run application
npm run dev
```

VIDEO DEMO:


https://github.com/user-attachments/assets/1faaa981-ac63-404c-ae3d-b8874e8c2715



## Technologies Used

- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Frontend**: [Vue.js](https://vuejs.org/), [Quasar](https://quasar.dev/)
- **Database**: [MongoDb](https://www.mongodb.com/)
