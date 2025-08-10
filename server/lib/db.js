import mongoose from "mongoose";

// function to connect mongodb

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("MongoDB connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/Zapchat`);
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};
