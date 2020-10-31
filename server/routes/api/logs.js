const express = require("express");
const router = express.Router();
const Log = require("../../models/Log");

// @route GET api/logs/:datetime
// @desc Get log for datetime
// @access Public

router.get("/:datetime", (req, res) => {
    Log.findOne({datetime: req.params.datetime})
        .then(log => res.json(log))
        .catch(err => res.status(400).json(err));
});

// @route GET api/logs/:starttime/:endtime
// @desc Get log between specified datetimes
// @access Public

router.get("/:starttime/:endtime", (req, res) => {
  Log.find({datetime: {$gte: req.params.starttime, $lte: req.params.endtime}})
      .then(logs => res.json(logs))
      .catch(err => res.status(400).json(err));
});

// @route GET api/logs
// @desc Get all logs
// @access Public
router.get("/", (req, res) => {
    Log.find()
      .then(logs => res.json(logs))
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/logs/add
// @desc Add a log
// @access Public
router.post('/add', async (req, res) => {
  
  const new_log = await new Log({
    datetime: new Date(),
    temperature: 20,
    moisture: 54,
    humidity: 65,
    brightness: 21
  });

  new_log.save()
    .then(log => res.json(log))
    .catch(err => res.status(400).json(err));
});


module.exports = router;