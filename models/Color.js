const mongoose = require("mongoose");
// Schema for the colors of the events
const ColorSchema = new mongoose.Schema({

  color: {
    type: String,
    required: true,
  },
  typeOfEvent: {
    type: String,
    required: true,
  }
});

module.exports = new mongoose.model("Color", ColorSchema);