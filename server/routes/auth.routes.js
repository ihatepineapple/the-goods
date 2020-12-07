const { Router } = require("express");
const router = Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/User.model");

/* SIGNUP ROUTE */
router.post("/signup", (req, res) => {
  const { email, password, type } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Provide email address and password" });
    return;
  }

//   if (password.length < 7) {
//     res.status(400).json({
//       message:
//         "Please make your password at least 8 characters long for security purposes.",
//     });
//     return;
//   }

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Email check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "This email is already in use. Please use another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);

    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      email: email,
      password: hashPass,
      type: type
    });

    aNewUser.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        res.status(200).json(aNewUser);
      });
    });
  });
});

/* LOGIN ROUTE */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      res.status(200).json(theUser);
    });
  })(req, res, next);
});

module.exports = router;