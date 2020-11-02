// function that calls the python script
// by default, measureBrightness will take a new photo. 
// If useExisting is set to true, we will instead use an existing photo determined the fileName parameter
function measureBrightness(useExisting = false, fileName = "temp.jpg") {
    return new Promise((resolve, reject) => {
        if (!useExisting) {
            // TODO: Take a new photo
        }

        let spawn = require('child_process').spawn;
        py = spawn('python', ['measure_brightness.py', fileName]);

        py.stdout.on('data', data => {
            const output = data.toString();
            const dataType = output.split(": ")[0];
            // brightness is from 0-255, so we convert it to a decimal rounded to 4 decimal points
            const dataValue = Math.round(parseFloat(output.split(": ")[1]) / 255 * 10000) / 10000;
            if (dataType === "brightness") {
                // if the data is in the right format, assume success and resolve the value
                resolve(dataValue);
            }
            else {
                reject(`Error excecuting python script, got output: ${data}`);
            }
        });
    });
}

module.exports = { measureBrightness };