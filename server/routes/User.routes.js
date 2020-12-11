const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const User = require("../models/User.model");
//get profile is for talent (you get your own profile)
// get profile/id and that's for business (they get someone else profile)
router.get("/profile/:id", (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Ooops! This profile seems to not exist" });
      return;
    }
  
    User.findById(id)
      .populate("projects")
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
});

router.put("/profile/:id", (req, res) => {
    console.log(req.body)
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Ooops! This profile does not exist" });
      return;
    }
  
    User.findByIdAndUpdate(id, req.body)
      .then(() => {
        res.status(200).json({
          message: `Profile with ${id} has been updated successfully.`,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
});

module.exports = router