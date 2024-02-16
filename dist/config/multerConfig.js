"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // if (!fs.existsSync("public")) {
        //   fs.mkdirSync("public");
        // }
        // if (!fs.existsSync("public/images")) {
        //   fs.mkdirSync("public/images");
        // }
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return cb(new Error("Only images are allowed!"));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
});
exports.default = upload;
