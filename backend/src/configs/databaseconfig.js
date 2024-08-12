const mongoose = require('mongoose');

// Retrieve environment variables
const url = process.env.URL;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connection with MongoDB is OK');
  })
  .catch((error) => {
    console.error('Connection with MongoDB failed.', error);
  });
