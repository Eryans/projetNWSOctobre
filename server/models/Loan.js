const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
  {
    loanDate: { type: Date },
    returnDate: { type: Date },
  },
  { timestamps: true }
);
const LoanModel = mongoose.model("loans", LoanSchema);
module.exports = LoanModel;
