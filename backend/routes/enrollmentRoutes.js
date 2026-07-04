const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { enrollCourse, getMyCourses, updateProgress } = require("../controllers/enrollmentController");

router.post("/", authMiddleware, enrollCourse);
router.get("/my-courses", authMiddleware, getMyCourses);
router.put("/progress", authMiddleware, updateProgress);

module.exports = router;
