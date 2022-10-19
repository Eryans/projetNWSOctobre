var express = require("express");
const dotenv = require("dotenv").config();
const mongo = require("mongoose");
var router = express.Router();


/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Server running");
  /* res.render('index', { title: 'Express' }); */
});


module.exports = router;
