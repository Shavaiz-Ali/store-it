"use server";

import { User } from "@/models/auth/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers"; // For managing cookies in Next.js server actions
import { connectDB } from "@/config";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "your-access-token-secret";

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "7d", // Use a consistent format
    algorithm: "HS256",
  });
};

export const Login = async (formData: FormData) => {
  await connectDB();
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: "All fields are required",
        status: 400,
      };
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return {
        success: false,
        message: "User with given email not found!",
        status: 401, // Generalized message for security
      };
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Incorrect password",
        status: 401, // Generalized message for security
      };
    }

    // Generate access token
    const accessToken = generateAccessToken(userExists._id);

    // Save access token to user record (optional, depending on your requirements)
    userExists.accessToken = accessToken;
    await userExists.save();

    // Set the cookie
    (await cookies()).set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60, // 15 minutes
      sameSite: "strict",
      path: "/",
    });

    // Return success response
    return {
      success: true,
      message: "Login successful",
      status: 200,
      user: {
        id: userExists._id,
        email: userExists.email,
        name: userExists.name,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
