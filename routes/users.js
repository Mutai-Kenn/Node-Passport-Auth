const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

const { registerValidation } = require("../validation");

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Register handle
router.post("/register", async (req, res) => {
  try {
    // User input validation before submition
    const { error } = registerValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    if (error)
      return res.render("register", { error: error.details[0].message });

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

    const savedUser = await newUser.save();
    res.redirect("/users/login");
  } catch {
    // res.status(400).send(error);
    // console.log(error);
    res.redirect("/users/register");
  }
});

//Login User
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//Logout User
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});
module.exports = router;
