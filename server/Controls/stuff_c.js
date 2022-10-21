const Loan = require("../models/Loan");
const Stuff = require("../models/Stuff");

const getStuff = async (req, res) => {
  const stuffs = await Stuff.find();
  return res.status(200).json({ message: "Returning stuffs", stuffs: stuffs });
};
const getSpecificStuff = async (req, res) => {
  const stuff = await Stuff.findById(req.params.id);
  if (stuff) {
   return res.status(200).json({ message: "Returning stuffs", stuff: stuff });
  } else {
    return res.status(404).json({ message: "No stuff with this id was found" });
  }
};
const createStuff = async (req, res) => {
  try {
    const { name, type } = req.body;
    const newStuff = await Stuff.create({ name: name, type: type });
    if (newStuff) return res.status(201).json({ message: "new Stuff was added" });
  } catch (error) {
    console.error(error);
  }
};
const updateStuff = async (req, res) => {
  try {
    const data = req.body.data;
    const stuffToUpdate = await Stuff.findById(req.body._id);
    if (stuffToUpdate) {
      const updatedStuff = await Stuff.findByIdAndUpdate(
        stuffToUpdate._id,
        data,
        { returnDocument: "after" }
      );
      return res
        .status(200)
        .json({ message: "Stuff updated successfully", data: updatedStuff });
    } else {
     return res.status(404).json({ message: "No stuff with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteStuff = async (req, res) => {
  try {
    const stuffToDelete = await Stuff.findById(req.body._id);
    const isLoan = await Loan.find({ stuffTaken: req.body._id });
    if (isLoan)
      return res.status(200).json({
        message: "This stuff is currently loaned, return it before deleting it",
      });
    if (stuffToDelete) {
      Stuff.findByIdAndDelete(stuffToDelete._id).then(() => {
        return res.status(200).json({ message: "Stuff was deleted" });
      });
    } else {
      return res.status(404).json({ message: "No stuff with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getStuff,
  createStuff,
  getSpecificStuff,
  updateStuff,
  deleteStuff,
};
