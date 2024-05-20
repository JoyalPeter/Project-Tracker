# Take Home Challenge

## Description

This project is a web application built with React and Material-UI for the frontend and Node.js for the backend. It uses mysql as database It provides features such as user authentication, project management, task management, and the ability to export project data as GitHub secret gists.

## Setup

### Cloning the Repository

Clone the repository by running the following code
   ```
   git clone https://github.com/JoyalPeter/Take-home-challenge.git
   cd Take-home-challenge
   ```

### Installing Dependencies
#### Frontend
```
cd frontend
npm install
```
#### Backend
```
cd backend
npm install
```

### Setup env files
#### Frontend
Create a .env file in the frontend directory with the following content:

```
VITE_BASEURL=your-base-url
VITE_GITHUB_API_TOKEN=your-github-token
```
Replace the values with original credentials.
Replace your-github-token with a GitHub token that has permissions to create gist files in your GitHub profile. You can generate this token from your GitHub account settings. Read more about creating github tokens [here](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

#### Backend
Create a .env file in the backend directory with the following content:
```
DATABASE_HOST=your-database-host
DATABASE_PORT=your-database-port
DATABASE_USER=your-database-user
DATABASE_NAME=your-database-name
DATABASE_PASSWORD=your-database-password
JWT_SECRET=your-jwt-secret
```
Replace the values with original credentials

### Running the Project
#### Frontend
```
cd frontend
npm start
```

#### Backend
```
cd backend
npm start
```

### Running the Tests
#### Frontend Tests
```
cd frontend
npm test
```

#### Backend Tests
```
cd backend
npm test
```