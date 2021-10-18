const express = require("express");

const apiController = require("../controller/apicontroller");

const router = express.Router();

router.get("/getdata/:location", apiController.getData);

router.post("/send", apiController.send);

module.exports = router;
