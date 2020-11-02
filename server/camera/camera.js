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
            const dataValue = parseFloat(output.split(": ")[1]);
            if (dataType === "brightness") {
                resolve(dataValue);
            }
            else {
                reject(`Error excecuting python script, got output: ${data}`);
            }
        });
    });
}


module.exports = { measureBrightness };