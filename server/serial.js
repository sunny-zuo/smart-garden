const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const Log = require('./models/Log');

// we store temporary data in a json object
const tempLogData = {
    temperature: [],
    moisture: [],
    humidity: [],
    brightness: []
}

const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = new Readline();
port.pipe(parser);

parser.on('data', (line) => {
    // we get data in the form of "moisture: 0.01". By splitting with ": ", we get the type in the zero index and the value in the first index
    const dataType = line.split(": ")[0];
    const dataValue = parseFloat(line.split(": ")[1]);
    // console.log(`Received data of type '${dataType}' with value '${dataValue}'`)
    tempLogData[dataType].push(dataValue);
});

function init() {
    setInterval(logData, 1000 * 60 * 10); // logData every 10 minutes
}

function logData() {
    const new_log = await new Log({
        datetime: new Date(),
        // we average all values in the array and store it as a singular log
        temperature: averageValues(tempLogData.temperature),
        moisture: averageValues(tempLogData.moisture),
        humidity: averageValues(tempLogData.humidity),
        brightness: averageValues(tempLogData.brightness)
    });

    new_log.save().then(log => {
        // reset the arrays
        tempLogData.temperature = [];
        tempLogData.moisture = [];
        tempLogData.humidity = [];
        tempLogData.brightness = [];
    }).catch(err => {
        console.log(`Error saving logs: ${err}`);
    });
};

function averageValues(array) {
    // average the values and round to 4 decimal places
    return Math.round(array.reduce((prev, curr), prev + curr) / array.length * 10000) / 10000;
}

/* This code lists all SerialPorts
SerialPort.list().then(
    ports => ports.forEach(console.log),
    err => console.error(err)
  )
*/

module.exports = { init };