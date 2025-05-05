# MERN Notes App

A full-stack notes application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Create, read, update, and delete notes
- Dark-themed modern UI
- Responsive design
- Fallback to sample data when offline
- MongoDB database for persistent storage

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: Custom CSS

## Installation

1. Clone the repository

```
git clone https://github.com/your-username/mern-notes-app.git
cd mern-notes-app
```

2. Install dependencies

```
npm install
cd client && npm install
cd ../server && npm install
```

3. Set up environment variables
   Create a `.env` file in the server directory with:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the application

```
# Start backend server
cd server
npm start

# In a separate terminal, start frontend
cd client
npm start
```
