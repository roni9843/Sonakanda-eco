const multer = require('multer');
const path = require('path');

// স্টোরেজ সেটআপ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // ফোল্ডার তৈরি করে রাখতে হবে
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('শুধু jpg/png/gif ফাইল গ্রহণযোগ্য!'));
  },
});

// একাধিক ইমেজের জন্য
const uploadMultiple = upload.array('images', 6); // সর্বোচ্চ ৬টা ইমেজ

// সিঙ্গেল ইমেজের জন্য (স্টোরি)
const uploadSingle = upload.single('image');

module.exports = { uploadMultiple, uploadSingle };