const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test");

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

//Import models

require("./api/models/Case");


// Start our app!
const server = require('./server');


server.listen(9090, () => {
  console.log("server listening to port 9090");
});
