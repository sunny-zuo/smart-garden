const express = require("express");
const router = express.Router();
const path = require("path");

// @route GET api/image/latest
// @desc Get the latest image taken
// @access Public

router.get("/latest", (req, res) => {
    res.sendFile(path.normalize(`${__dirname}/../../camera/latest.jpg`));
});

module.exports = router;