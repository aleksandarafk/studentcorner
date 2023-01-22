//notes schema
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: [],
    color: String
  });
  
module.exports = new mongoose.model('ToDo', noteSchema);

