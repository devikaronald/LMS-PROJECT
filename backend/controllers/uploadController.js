const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

const uploadVideo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const stream = cloudinary.uploader.upload_stream(
    { resource_type: "video", folder: "lms/videos" },
    (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Video upload failed", error: error.message });
      }

      res.status(201).json({ message: "Video uploaded successfully", videoUrl: result.secure_url });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = { upload, uploadVideo };
