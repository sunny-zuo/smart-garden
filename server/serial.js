const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const Log = require('./models/Log');
const { measureBrightness, detectHeight } = require('./camera/camera');

// we store temporary data in a json object
const tempLogData = {
    temperature: [],
    moisture: [],
    humidity: [],
    brightness: [],
    height: []
}

const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = new Readline();
port.pipe(parser);

function recordBrightness() {
    //console.log(`Awaiting brightness reading`);
    measureBrightness().then((brightness) => {
        console.log(`Got brightness: ${brightness}`);
        tempLogData.brightness.push(brightness);
    });
}

function recordHeight() {
    //console.log(`Awaiting brightness reading`);
    detectHeight().then((height) => {
        console.log(`Got height: ${height}`);
        tempLogData.height.push(height);
    });
}

setInterval(recordBrightness, 1000 * 10);
setInterval(recordHeight, 1000 * 10);

function waterPlant() {
    console.log(`Initiating pumping`);
    port.write("PUMP_ON\n");
}

//for debugging, don't do this unless you want to drown my house
//setInterval(waterPlant, 1000 * 10);

parser.on('data', (line) => {
    // we get data in the form of "moisture: 0.01". By splitting with ": ", we get the type in the zero index and the value in the first index

    const dataType = line.split(": ")[0];
    const dataValue = parseFloat(line.split(": ")[1]);

    console.log(`Received data of type '${dataType}' with value '${dataValue}'`)
    switch(dataType) {
        case 'temperature':
            tempLogData.temperature.push(dataValue);
            break;
        case 'moisture':
            tempLogData.moisture.push(dataValue);
            break;
        case 'humidity':
            tempLogData.humidity.push(dataValue);
            break;
    }

});

function init() {
    setInterval(logData, 1000 * 60 * 10); // logData every 10 minutes
}

async function logData() {

    console.log(`Preparing to send logs...`);

    const new_log = await new Log({
        datetime: new Date(),
        // we average all values in the array and store it as a singular log
        temperature: averageValues(tempLogData.temperature),
        moisture: averageValues(tempLogData.moisture),
        humidity: averageValues(tempLogData.humidity),
        brightness: averageValues(tempLogData.brightness),
        height: averageValues(tempLogData.height)
    });


    new_log.save().then(log => {
        // reset the arrays
        tempLogData.temperature = [];
        tempLogData.moisture = [];
        tempLogData.humidity = [];
        tempLogData.brightness = [];
        tempLogData.height = [];
        console.log(`Sent logs`);
    }).catch(err => {
        console.log(`Error saving logs: ${err}`);
    });


};

function averageValues(array) {
    if (array.length > 0) {
        // average the values and round to 4 decimal places
        return Math.round(array.reduce((prev, curr) => prev + curr) / array.length * 10000) / 10000;
    } else {
        return 0;
    }
}

/* This code lists all SerialPorts
SerialPort.list().then(
    ports => ports.forEach(console.log),
    err => console.error(err)
  )
*/

module.exports = { init, waterPlant };