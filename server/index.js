const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', { baudRate: 9600 });

const parser = new Readline();
port.pipe(parser);

parser.on('data', line => console.log(`> ${line}`));

/* This code lists all SerialPorts
SerialPort.list().then(
    ports => ports.forEach(console.log),
    err => console.error(err)
  )
*/