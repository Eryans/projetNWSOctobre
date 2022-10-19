const mongoose = require("mongoose");

const StuffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    /* loaned: { type: Boolean },
    loanDate: { type: Date }, 
    returnDate: { type: Date },*/
  },
  { timestamps: true }
);
const StuffModel = mongoose.model("stuffs", StuffSchema);
module.exports = StuffModel;
