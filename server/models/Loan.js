const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
  {
    loanDate: { type: Date },
    returnDate: { type: Date },
    takenBy: { type: String },
  },
  { timestamps: true }
);
const LoanModel = mongoose.model("loans", LoanSchema);
module.exports = LoanModel;
