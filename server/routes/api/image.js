const express = require("express");
const router = express.Router();
const path = require("path");

// @route GET api/image/latest
// @desc Get the latest image taken
// @access Public

router.get("/latest", (req, res) => {
    res.sendFile(path.normalize(`${__dirname}/../../camera/latest.jpg`));
});

router.get("/take-picture", async (req, res) => {
    if (process.env.ENABLE_SERIAL == "TRUE") {
        const { takePhoto } = require("../../camera/camera");
        await takePhoto().catch(err => {
            res.status(500).send({ success: false, error: err });
        });
        res.send({ success: true });
    } else {
        res.status(500).send({ success: false, error: 'Can\'t take photo on remote server - test on Umut\'s Network' });
    }
});

module.exports = router;