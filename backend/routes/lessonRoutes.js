const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { createLesson, updateLesson, deleteLesson } = require("../controllers/lessonController");

router.post("/", authMiddleware, roleMiddleware(["admin", "instructor"]), createLesson);
router.put("/:id", authMiddleware, updateLesson);
router.delete("/:id", authMiddleware, deleteLesson);

module.exports = router;
