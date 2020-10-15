const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', { baudRate: 9600 });

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Mongo Atlas Config
const uri = "insert link here";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

const parser = new Readline();
port.pipe(parser);

parser.on('data', line => console.log(`> ${line}`));

/* This code lists all SerialPorts
SerialPort.list().then(
    ports => ports.forEach(console.log),
    err => console.error(err)
  )
*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})