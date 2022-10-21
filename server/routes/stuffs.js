var express = require("express");
const {
  getStuff,
  createStuff,
  getSpecificStuff,
  updateStuff,
  deleteStuff,
} = require("../Controls/stuff_c");
var router = express.Router();

/* GET users listing. */
router.get("/", getStuff);
router.get("/:id", getSpecificStuff);
router.post("/add", createStuff);
router.patch("/update", updateStuff);
router.delete("/delete", deleteStuff);

module.exports = router;
