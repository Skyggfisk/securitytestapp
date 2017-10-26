"use strict";

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String }
});

var User = mongoose.model("User", userSchema);
