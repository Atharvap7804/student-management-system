const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');// Save files in the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${path.extname(file.originalname)}`);//Save file wirh unique name
  }
})

const fileFilter = (req, file, cb) => {
  // Accept only specific file types (e.g., images)
  const allowedTypes=/jpeg|jpg|png/;
  const extname =allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname|| mimetype) {
    cb(null, true);
  } else {
   cb(new Error('Only JPEG, JPG, and PNG images are allowed!'));
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter
});

module.exports = upload;