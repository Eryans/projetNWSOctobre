const mongoose = require("mongoose");
const StuffModel = require("./Stuff");

const LoanSchema = new mongoose.Schema(
  {
    returnDate: { type: Date },
    takenBy: { type: Number, required: true },
    stuffTaken: {
      type: mongoose.Schema.Types.ObjectId,
      ref: StuffModel,
      required: true,
    },
  },
  { timestamps: true }
);
const LoanModel = mongoose.model("loans", LoanSchema);
module.exports = LoanModel;
