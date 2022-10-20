var express = require("express");
const { getLoans, makeLoan, updateLoan, getSpecificLoan, deleteLoan } = require("../Controls/loan_c");
var router = express.Router();

/* GET users listing. */
router.get("/", getLoans);
router.get("/", getSpecificLoan);
router.post("/add", makeLoan);
router.patch("/update",updateLoan)
router.delete("/delete",deleteLoan)

module.exports = router;
