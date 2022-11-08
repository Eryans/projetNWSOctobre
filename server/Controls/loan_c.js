const Loans = require("../models/Loan");
const date = require('date-and-time')

const getLoans = async (req, res) => {
  try {
    const loans = await Loans.find();
    if (loans)
      return res.status(200).json({ message: "Returning Loads", loans: loans });
  } catch (error) {
    console.error(error);
  }
};
const getSpecificLoan = async (req, res) => {
  try {
    const loan = await Loans.findById(req.params.id);
    if (loan) {
      return res.status(200).json({ message: "Returning loan", loan: loan });
    } else {
      return res.json({ message: "No loan with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
const makeLoan = async (req, res) => {
  try {
    const { takenBy, nbrOfDays, stuffTaken } = req.body;
    nbrOfDays || nbrOfDays > 0 ? nbrOfDays : 0;
    const currentDate = new Date()
    const newLoan = await Loans.create({
      takenBy: takenBy,
      loanDate: currentDate,
      returnDate: date.addDays(currentDate,nbrOfDays),
      stuffTaken: stuffTaken,
    });
    if (newLoan)
    return res.status(201).json({ message: "new loan was taken", newLoan: newLoan });
  } catch (error) {
    console.error(error);
    return res.json({message:'Something went wrong'})
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
      return res
        .status(200)
        .json({ message: "Loan updated successfully", data: updatedLoan });
    } else {
      return res.json({ message: "No loan with this id was found" });
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
        return res.status(200).json({ message: "Loan was deleted" });
      });
    } else {
      return res.json({ message: "No loan with this id was found" });
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
  deleteLoan,
};
