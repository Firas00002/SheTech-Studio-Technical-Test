import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  try {
    const db=process.env.DATABASE || ""
    await mongoose.connect(db);
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};