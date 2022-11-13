var express = require("express");
const { getStudents, getSpecificStudent, makeStudent, updateStudent, deleteStudent } = require("../Controls/student_c");
var router = express.Router();

/* GET users listing. */
router.get("/", getStudents);
router.get("/:id", getSpecificStudent);
router.post("/add", makeStudent);
router.patch("/update",updateStudent)
router.delete("/delete",deleteStudent)

module.exports = router;
