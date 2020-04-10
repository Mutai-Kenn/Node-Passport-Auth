const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const { registerValidation, loginValidation } = require("../validation");

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Register handle
router.post("/register", async (req, res) => {
  // User input validation before submition
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // if (error) return res.render("register", { error: error.details[0].message });

  // Check if email already exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email already Exist");

  // Hash the password from the user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    birthday: req.body.birthday,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.redirect("/users/login");
  } catch {
    res.status(400).send(error);
    //res.redirect("/users/register");
  }
});

//Login User
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;
