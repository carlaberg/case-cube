const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect("mongodb://localhost:27017/casecube");

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


server.listen(9090, () => {
  console.log("server listening to port 9090");
});
