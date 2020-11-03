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
        py = spawn('python3.7', ['camera/measure_brightness.py', `camera/${fileName}`]);

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

//measureBrightness().then((brightness) => console.log(`Got brightness: ${brightness}`));

module.exports = { measureBrightness };