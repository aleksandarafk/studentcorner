//notes schema
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    date: String,
    color: String
  });
  
module.exports = new mongoose.model('Note', noteSchema);

