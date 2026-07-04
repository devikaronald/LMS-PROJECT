const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Progress = require("../models/Progress");

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyEnrolled = await Enrollment.findOne({ userId: req.user.id, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      userId: req.user.id,
      courseId,
      progress: 0,
      completedLessons: [],
    });

    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.id }).populate("courseId").sort({ enrolledAt: -1 });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, completed } = req.body;

    if (!courseId || !lessonId) {
      return res.status(400).json({ message: "Course ID and Lesson ID are required" });
    }

    const enrollment = await Enrollment.findOne({ userId: req.user.id, courseId });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    const progressEntry = await Progress.findOneAndUpdate(
      { userId: req.user.id, lessonId },
      { $set: { watchedAt: new Date(), isCompleted: Boolean(completed) } },
      { upsert: true, new: true }
    );

    if (completed) {
      if (!enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
      }
    } else {
      enrollment.completedLessons = enrollment.completedLessons.filter((id) => id.toString() !== lessonId);
    }

    const totalLessons = await Lesson.countDocuments({ courseId });
    const completedCount = enrollment.completedLessons.length;
    enrollment.progress = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;
    await enrollment.save();

    res.status(200).json({ message: "Progress updated", progress: enrollment.progress, progressEntry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollCourse, getMyCourses, updateProgress };
