const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  yesCount: { type: Number, default: 0 },
  noCount: { type: Number, default: 0 },
  maybeCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Event", eventSchema);
