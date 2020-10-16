const express = require("express");
const router = express.Router();
const Log = require("../../models/Log");

// @route GET api/logs/:datetime
// @desc Get log for datetime
// @access Public

router.get("/:datetime", (req, res) => {
    Log.findOne({datetime: req.datetime})
        .then(log => res.json(log))
        .catch(err => res.status(400).json(err));
});

module.exports = router;