const SerialPort = require('serialport')
const fs = require('fs')
const port = new SerialPort('COM3', {baudRate: 9600}) //You'll need to change these for sure
writer_boi = fs.createWriteStream('testing.txt')

function write_to_port(input_char) {
    port.write(input_char)
}

port.on('data', function(output) {
    console.log(output)
    for (const value of output.values()) {
        writer_boi.write(value + '\n')
    }
   
})

setTimeout((function() {
    console.log("timeout")
    return process.exit(22);
}), 15000);