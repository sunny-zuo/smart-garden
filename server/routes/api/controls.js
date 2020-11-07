const express = require("express");
const router = express.Router();


// @route POST api/controls/water
// @desc Water plant
// @access Public
router.post('/water', (req, res) => {
  // const amount = req.body.amount;
  if (process.env.ENABLE_SERIAL === "TRUE") {
    const { waterPlant } = require("../../serial");
    waterPlant();
  }
  res.send({ success: true });
});


module.exports = router;