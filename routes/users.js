const express = require("express");
const router = express.Router();

const { registerValidation, loginValidation } = require("../validation");

// Register Page
router.get("/register", (req, res) => res.render("register"));

// Login Page
router.get("/login", (req, res) => res.render("login"));

// Register handle
router.post("/register", (req, res) => {
  // User input validation before submittion
  const { error } = registerValidation(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  if (error) return res.render("register", { error: error });
});

module.exports = router;
