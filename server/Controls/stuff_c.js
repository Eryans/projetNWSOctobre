const Stuff = require("../models/Stuff");

const getStuff = async (req, res) => {
  res.status(200).json({ message: "Sup dude" });
};
const createStuff = async (req, res) => {
  try {
    const { name, type } = req.body;
    const newStuff = await Stuff.create({ name: name, type: type });
    if (newStuff) res.status(201).json({ message: "new Stuff was added" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getStuff,
  createStuff,
};
