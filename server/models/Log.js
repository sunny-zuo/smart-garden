const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  datetime: {
    type: Date,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  moisture: {
    type: Number,
    required: true
  }
});

module.exports = Log = mongoose.model("logs", LogSchema);