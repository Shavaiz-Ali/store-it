"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/config";
import { User } from "@/models/user/user";
import bcrypt from "bcrypt";

export const createAccount = async (formdata: FormData) => {
  await connectDB();
  try {
    const fullName = formdata.get("fullName") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    console.log("Received data:", fullName, email);

    // Validate input fields
    if (!email || !fullName || !password) {
      return {
        success: false,
        message: "All fields are required.",
        status: 400, // Bad Request
      };
    }

    // // Check if user already exists
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return {
    //     success: false,
    //     message: "Email already exists. Please use a different email.",
    //     status: 409, // Conflict
    //   };
    // }

    // Encrypt password
    const saltRounds = 10;
    const encryptPassword = await bcrypt.hash(password, saltRounds);
    if (!encryptPassword) {
      return {
        success: false,
        message: "An error occurred while encrypting the password.",
        status: 500, // Internal Server Error
      };
    }

    // Create a new user
    const user = new User({
      fullName,
      email,
      password: encryptPassword,
    });

    const savedUser = await user.save();
    if (!savedUser) {
      return {
        success: false,
        message: "Failed to create the user. Please try again later.",
        status: 500, // Internal Server Error
      };
    }

    return {
      success: true,
      message: "User created successfully.",
      status: 201, // Created
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Internal server error. Please try again later.",
      status: 500, // Internal Server Error
    };
  }
};
