const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true },
    duration: { type: String, default: "00:00" },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
