import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./modules/user/user.routes"
import bookingRoutes from "./modules/booking/booking.routes"


import connectDB from "./config/db";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8000;

// DATABASE CONNECTION
connectDB();

// ROUTES
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/booking',bookingRoutes)




app.get("/", (req, res) => {
    res.send("Server is runnig");
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });