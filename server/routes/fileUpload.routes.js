const { Router } = require("express");
const router = Router();

const fileUploader = require("../configs/cloudinary.config");

/* POST - upload images   */
router.post("/upload-profile", fileUploader.single("userImg"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
});

router.post("/upload-hero", fileUploader.single("heroImage"), (req, res, next) => {
  res.status(200).json({ cloudinaryUrl: req.file.path });
});

router.post("/upload-images", fileUploader.array('images', 6), (req, res, next) => {
  
  const imagesArray = req.files.map((imageObject) => imageObject.path)
  console.log(imagesArray)
  res.status(200).json({ cloudinaryUrl: imagesArray });
});

module.exports = router;