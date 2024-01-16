import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed!"));
    }

    cb(null, true);
  },
  limits: {
    fileSize: 3 * 1024 * 1024,
  }, });


export default upload;