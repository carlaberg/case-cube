require('dotenv').config();

const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const uri = process.env.NODE_ENV === 'development' ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
global.__basedir = __dirname; // Set __basedir to root

mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Initialize mongoose-auto-increment

autoIncrement.initialize(mongoose.connection);

//Import models

require("./api/models/Case");


// Start our app!
const server = require('./server');

const PORT = process.env.PORT || 9090;

server.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
});
