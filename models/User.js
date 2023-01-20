//user schema - follow this structure to create your own schema and fill it with the needed for you things 
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("User", UserSchema);
