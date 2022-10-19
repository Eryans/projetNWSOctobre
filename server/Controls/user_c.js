const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc Get Users
// @route GET /api/user
const getUsers = (req, res) => {
  try {
    const users = User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};
const getConnectedUser = async (req, res) => {
  try {
    const { _id, mail, name } = req.body;
    const user = User.find({ user: req.user.id });
  } catch (err) {}
};
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
// @route POST /api/user/register
const setUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({ message: "Veuillez remplir toutes les informations" });
    }
    // Check if user already exist
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.json({ message: "Utilisateur déjà enregistré" });
    }
    // hash passward
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register User
    const user = await User.create({
      name: username,
      email: email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        _id: user.id,
        username: user.name,
        email: user.email,
        message: "Votre compte a bien été enregistré",
        token: generateToken(user._id),
      });
    } else {
      return res.json({ message: "INVALID USER DATA" });
    }
  } catch (err) {
    console.log(err);
  }
};

// @route /api/user/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user && bcrypt.compare(password, user.password)) {
      let token = await generateToken(user._id);
      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
        message: "Utilisateur connecté",
        groups: user.groups,
        success: true,
      });
    } else {
      return res.json({ message: "Informations invalides", success:false });
    }
  } catch (err) {
    console.log(err);
  }
};
// @route PUT /api/user/:id
const updateUser = (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) {
    return res.json("User not found");
  }
  try {
    const updatedUser = User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};
// @route DELETE /api/user/:id
const deleteUser = (req, res) => {
  const user = User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  try {
    const deletedUser = User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `${user.name} was deleted` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser,
};