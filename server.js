const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 5000;
const passport = require("passport");

const app = express();
// Passport confiq
require("./config/passport")(passport);

// Serving static files(Css and images)
app.use(express.static("public"));

dotenv.config();
// Connect to MongoDB Atlas
mongoose.connect(
  process.env.MONGO_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
