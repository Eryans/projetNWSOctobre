const Loans = require("../models/Loan");

const getLoans = async (req, res) => {
  try {
    const loans = await Loans.find();
    if (loans)
      res.status(200).json({ message: "Returning Loads", loans: loans });
  } catch (error) {
    console.error(error);
  }
};
const getSpecificLoan = async (req, res) => {
  try {
    const loan = await Loans.findById(req.body.id);
    if (loan) res.status(200).json({ message: "Returning loan", loan: loan });
  } catch (error) {
    console.error(error);
  }
};
const makeLoan = async (req, res) => {
  try {
    const { takenBy } = req.body;
    const newLoan = await Loans.create({
      takenBy: takenBy,
      loanDate: Date.now(),
    });
    if (newLoan) res.status(201).json({ message: "new loan was taken" });
  } catch (error) {
    console.error(error);
  }
};
const updateLoan = async (req, res) => {
  try {
    const data = req.body.data;
    const loanToUpdate = await Loans.findById(req.body._id);
    if (loanToUpdate) {
      const updatedLoan = await Loans.findByIdAndUpdate(
        loanToUpdate._id,
        data,
        { returnDocument: "after" }
      );
      res
        .status(200)
        .json({ message: "Loan updated successfully", data: updatedLoan });
    } else {
      res.status(404).json({ message: "No loan with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteLoan = async (req, res) => {
  try {
    const loanToDelete = await Loans.findById(req.body._id);
    if (loanToDelete) {
      Loans.findByIdAndDelete(loanToDelete._id).then(() => {
        res.status(200).json({message:"Loan was deleted"})
      })
    } else {
      res.status(404).json({ message: "No loan with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getLoans,
  makeLoan,
  updateLoan,
  getSpecificLoan,
  deleteLoan
};
