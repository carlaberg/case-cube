const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const server = express();

const router = require("./api/routes");


// const profile = require("./api/routes/profile");

server.get("/", (req, res) => {
  fs.readFile("./public/index.html", (err, data) => {
    res.send(data.toString());
  });
});

server.use(bodyParser.json());
server.use("/", router);
server.use(express.static('public'));
// server.use("/profile", profile);


server.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


module.exports = server;
