"use server";

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    mongoose
      .connect(`${MONGODB_URI}`)
      .then(() => console.log("mongodb connected successfull!"))
      .catch((err) => {
        console.log("error connecting to MongoDB", err);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
