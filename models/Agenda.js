const mongoose = require("mongoose");
// Schema for the creation of events in the agenda
const AgendaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  reminder: {
    type: String,
    required: true,
   },
});

module.exports = new mongoose.model("Agenda", AgendaSchema);