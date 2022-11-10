const mongoose = require("mongoose");

const StuffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String },
    state: {type: String},
    loaned: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const StuffModel = mongoose.model("stuffs", StuffSchema);
module.exports = StuffModel;
