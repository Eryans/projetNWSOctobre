const StudentModel = require("../models/Student");
const axios = require("axios");
const getStudents = async (req, res) => {
  try {
    axios
      .get("http://vps-a47222b1.vps.ovh.net:4242/Student", { proxy: { host: '127.0.0.1', port: 5000 } })
      .then((response) => {
        // const students = await StudentModel.find();
        const students = response.data
        if (students) {
          res.json({
            success: true,
            message: "returning students",
            data: students,
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
};

const getSpecificStudent = async (req, res) => {
  try {
    const students = await axios.get(`http://vps-a47222b1.vps.ovh.net:4242/Student/`)
    // Why this api doesn't have a specific item getter ?!
    const specificStudent = students.data.filter(student => student.id === parseInt(req.params.id)).shift()
    console.log(specificStudent)
    if (!specificStudent) return res.json({ success: false, message: "No student with this id was found" })
    if (specificStudent) {
      return res
        .status(200)
        .json({ success: true, message: "Returning student", data: specificStudent });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No student with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
// const getSpecificStudent = async (req, res) => {
//   try {
//     const student = await StudentModel.findById(req.params.id);
//     if (student) {
//       return res
//         .status(200)
//         .json({ success: true, message: "Returning student", data: student });
//     } else {
//       return res
//         .status(404)
//         .json({ success: false, message: "No student with this id was found" });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

const makeStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newStudent = await StudentModel.create({
      name: name,
      email: email,
    });

    res.json({
      success: true,
      message: "Created new student",
      data: newStudent,
    });
  } catch (error) {
    console.error(error);
  }
};
const updateStudent = async (req, res) => {
  try {
    const data = req.body.data;
    const studentToUpdate = await StudentModel.findById(req.body._id);
    if (studentToUpdate) {
      const updatedStuff = await StudentModel.findByIdAndUpdate(
        studentToUpdate._id,
        data,
        { returnDocument: "after" }
      );
      return res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: updatedStuff,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No student with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
const deleteStudent = async (req, res) => {
  try {
    const studentToDelete = await StudentModel.findById(req.body._id);
    if (studentToDelete) {
      StudentModel.findByIdAndDelete(studentToDelete._id).then(() => {
        return res
          .status(200)
          .json({ success: true, message: "Stuff was deleted" });
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No stuff with this id was found" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getStudents,
  getSpecificStudent,
  makeStudent,
  updateStudent,
  deleteStudent,
};
