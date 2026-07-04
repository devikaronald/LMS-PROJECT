const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const createLesson = async (req, res) => {
  try {
    const { courseId, title, description, videoUrl, duration, order } = req.body;

    if (!courseId || !title || !description || !videoUrl) {
      return res.status(400).json({ message: "Course ID, title, description, and video URL are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (req.user.role !== "admin" && course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to add lessons to this course" });
    }

    const lesson = await Lesson.create({
      courseId,
      title,
      description,
      videoUrl,
      duration: duration || "00:00",
      order: order || 1,
    });

    res.status(201).json({ message: "Lesson created successfully", lesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const course = await Course.findById(lesson.courseId);
    if (req.user.role !== "admin" && course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this lesson" });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Lesson updated successfully", lesson: updatedLesson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const course = await Course.findById(lesson.courseId);
    if (req.user.role !== "admin" && course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this lesson" });
    }

    await Lesson.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLesson, updateLesson, deleteLesson };
