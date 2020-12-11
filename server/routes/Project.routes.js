const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Project = require("../models/Project.model");
const User = require("../models/User.model");

router.post("/projects", (req, res) => {
    const { title, creativeField, description, heroImage, images } = req.body;
  
    Project.create({
      title,
      creativeField,
      description,
      heroImage,
      images,
      owner: req.user._id,
     
    })
      .then((response) => {
        return User.findByIdAndUpdate(req.user._id, {
          $push: { projects: response._id },
        });
      })
      .then((response) => {
        res.status(200).json(response);
    
      })
      .catch((err) => {
        res.status(500).json(err);
      });
});

router.get("/projects", (req, res) => {
    Project.find()
      .then((allTheProjects) => {
        res.status(200).json(allTheProjects);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
});

router.get("/projects/:id", (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Ooops! This project seems to not exist" });
      return;
    }
  
    Project.findById(id)
      .populate("owner")
      .then((project) => {
        res.status(200).json(project);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
});

router.put("/projects/:id/edit", (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Ooops! This project seems to not exist" });
      return;
    }
  
    Project.findByIdAndUpdate(id, req.body)
      .then(() => {
        res.status(200).json({
          message: `Project with ${id} has been updated successfully.`,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
});

router.delete("/projects/:id", (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "This project seems to not exist" });
      return;
    }
  
    Project.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({
          message: `Project with ${id} has been removed successfully.`,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
});


module.exports = router;