var express = require("express");
const { getStuff, createStuff } = require("../Controls/stuff_c");
var router = express.Router();

/* GET users listing. */
router.get("/", getStuff);
router.post("/add",createStuff)

module.exports = router;
