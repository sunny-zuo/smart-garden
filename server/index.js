const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const serverPort = process.env.PORT || 5000;

// Routes
const logs = require("./routes/api/logs");

// Mongo Atlas Config
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

// CORS middleware - we're allowing all origins by not giving any arguments
app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Routes
app.use("/api/logs", logs);

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
})

// Serial communication
if (process.env.ENABLE_SERIAL === "TRUE") {
  const serial = require('./serial');
  serial.init();
}