const PiCamera = require('pi-camera');
const camera = new PiCamera({
    mode: 'photo',
    output: `${__dirname}/latest.jpg`,
    width: 1920,
    height: 1080,
    nopreview: true
})
// function that calls the python script
// by default, measureBrightness will take a new photo.
// If useExisting is set to true, we will instead use an existing photo determined the fileName parameter
function measureBrightness(useExisting = false, fileName = "latest.jpg") {
    return new Promise(async (resolve, reject) => {
        if (!useExisting) {
            await camera.snap().catch(err => {
                console.log(`Error taking new photo: ${err}`);
            });
        }

        let spawn = require('child_process').spawn;
        py = spawn('python3', ['camera/measure_brightness.py', `camera/${fileName}`]);

        py.stderr.on('data', function(data) {
            console.error(data.toString());
        });

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

// function that calls the python script to detect height
// by default, detectHeight will take a new photo.
// If useExisting is set to true, we will instead use an existing photo determined the fileName parameter
function detectHeight(useExisting = true, fileName = "latest.jpg") {
    return new Promise(async (resolve, reject) => {
        if (!useExisting) {
            await camera.snap().catch(err => {
                console.log(`Error taking new photo: ${err}`);
            });
        }

        let spawn = require('child_process').spawn;
        // Assume height of reference object is 10cm (last param)
        py = spawn('python3.7', ['camera/height_detect.py', `camera/${fileName}`, 10]);

        py.stderr.on('data', function(data) {
            console.error(data.toString());
        });

        py.stdout.on('data', data => {
            const output = data.toString();
            const dataType = output.split(": ")[0];
            const dataValue = parseFloat(output.split(": ")[1]);
            if (dataType === "height") {
                // if the data is in the right format, assume success and resolve the value

                resolve(dataValue);
            }
            else {
                reject(`Error executing python script, got output: ${data}`);
            }
        });
    });
}


function takePhoto() {
    return new Promise(async (resolve, reject) => {
        await camera.snap().catch(err => {
            reject(`Error taking new photo: ${err}`)
        });
        resolve({ success: true });
    });
}

//measureBrightness().then((brightness) => console.log(`Got brightness: ${brightness}`));

module.exports = { measureBrightness, detectHeight, takePhoto };