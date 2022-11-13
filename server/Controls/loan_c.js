const Loans = require("../models/Loan");
const date = require("date-and-time");
const StuffModel = require("../models/Stuff");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "jnvprojetnws@outlook.fr",
    pass: "tgbyhn0301",
    // Email fictif créer juste pour le projet
  },
});

const getLoans = async (req, res) => {
  try {
    const loans = await Loans.find();
    if (loans)
      return res
        .status(200)
        .json({ success: true, message: "Returning Loans", data: loans });
  } catch (error) {
    console.error(error);
  }
};
const getSpecificLoan = async (req, res) => {
  try {
    const loan = await Loans.findById(req.params.id);
    if (loan) {
      return res
        .status(200)
        .json({ success: true, message: "Returning loan", data: loan });
    } else {
      return res.json({
        success: false,
        message: "No loan with this id was found",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
const makeLoan = async (req, res) => {
  console.log(req.body);
  try {
    const { takenBy, nbrOfDays, stuffTaken } = req.body;
    const nbrOfDaysChecked = nbrOfDays && parseInt(nbrOfDays) > 0 ? nbrOfDays : 1;
    const currentDate = new Date();
    const loanedStuff = await StuffModel.findById(stuffTaken);
    if (loanedStuff) {
      if (loanedStuff.loaned)
        return res.json({ success: false, message: "Stuff already loaned" });
      loanedStuff.loaned = true;
      loanedStuff.save();
    }
    const newLoan = await Loans.create({
      takenBy: takenBy,
      loanDate: currentDate,
      returnDate: date.addDays(currentDate, parseInt(nbrOfDaysChecked)),
      stuffTaken: stuffTaken,
    });
    if (newLoan)
      var message = {
        from: "jnvprojetnws@outlook.fr",
        to: "julesnoir@hotmail.fr",
        subject: "Un emprunt a été réalisé",
        text: `Bonjour cher utilisateur, je vous notifie qu'un emprunt vient d'être réalisé`,
        html: "<p>Bonjour cher utilisateur, je vous notifie qu'un emprunt vient d'être réalisé</p>",
      };
    transporter.sendMail(message);
    return res.status(201).json({
      success: true,
      message: "new loan was taken",
      data: newLoan,
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Something went wrong" });
  }
};
const updateLoan = async (req, res) => {
  try {
    console.log(req);
    const data = req.body.data;
    const loanToUpdate = await Loans.findById(req.body._id);
    if (loanToUpdate) {
      const updatedLoan = await Loans.findByIdAndUpdate(
        loanToUpdate._id,
        data,
        { returnDocument: "after" }
      );
      return res.status(200).json({
        success: true,
        message: "Loan updated successfully",
        data: updatedLoan,
      });
    } else {
      return res.json({
        success: false,
        message: "No loan with this id was found",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteLoan = async (req, res) => {
  try {
    const loanToDelete = await Loans.findById(req.body._id);
    if (loanToDelete) {
      const loanedStuff = await StuffModel.findById(loanToDelete.stuffTaken);
      if (loanedStuff) {
        loanedStuff.loaned = false;
        loanedStuff.save();
      }
      Loans.findByIdAndDelete(loanToDelete._id).then(() => {
        return res
          .status(200)
          .json({ success: true, message: "Loan was deleted" });
      });
    } else {
      return res.json({
        success: false,
        message: "No loan with this id was found",
      });
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
