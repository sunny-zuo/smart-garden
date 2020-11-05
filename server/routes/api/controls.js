const express = require("express");
const router = express.Router();
const { waterPlant } = require("../../serial");

// @route POST api/controls/water
// @desc Water plant
// @access Public
router.post('/water', (req, res) => {
  // const amount = req.body.amount;
  waterPlant();
});


module.exports = router;