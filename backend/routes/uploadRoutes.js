const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { upload, uploadVideo } = require("../controllers/uploadController");

router.post("/video", authMiddleware, upload.single("video"), uploadVideo);

module.exports = router;
