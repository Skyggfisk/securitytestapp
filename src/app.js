var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb
var mongoose = require("mongoose");
var connections = require("./connections.json");
mongoose.connect(connections.securityTestDb);

// acquire user schema
require("./models/user.js");
var User = mongoose.model("User");

// default route
app.get("/", function(req, res) {
  res.send("Hello Express!");
});

// signup route
app.post("/signup", function(req, res) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send("User " + req.body.username + " registered");
    }
  });
});

// login route
app.post("/login", function(req, res) {
  // if query url exists
  if (req.query.username) {
    User.findOne(
      { username: req.query.username, password: req.query.password },
      function(err, data) {
        if (err) {
          res.send(err);
        } else if (data) {
          res.send("User login successful");
        } else {
          res.send("Wrong username or password");
        }
      }
    );
    // else use body
  } else {
    User.findOne(
      { username: req.body.username, password: req.body.password },
      function(err, data) {
        if (err) {
          res.send(err);
        } else if (data) {
          res.send("User login successful");
        } else {
          res.send("Wrong username or password");
        }
      }
    );
  }
});

// start server on localhost:3000
app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
