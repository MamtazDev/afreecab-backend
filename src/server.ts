import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from 'multer';
import path from "path";



import connectDB from "./config/db";

// CONFIGURATIONS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const corsOptions = {
  origin: 'http://your-frontend-app-domain.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8000;

// DATABASE CONNECTION
connectDB();





// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Express route to handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'File uploaded successfully', filename: req.file?.filename });
});

// Express route to serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));




app.get("/", (req, res) => {
    res.send("Server is runnig");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });