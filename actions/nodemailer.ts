"use server";

import { connectDB } from "@/config";
import { User } from "@/models/auth/user";
import { sendEmail } from "@/utils";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
};

export const sendOTP = async (formData: FormData) => {
  await connectDB();

  try {
    const email = formData.get("email") as string;

    console.log("Email received:", email);

    // Check if email is provided
    if (!email) {
      return {
        success: false,
        message: "Email is required.",
        status: 400,
      };
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Please use a different email.",
        status: 409,
      };
    }

    // Generate OTP
    const otp = generateOtp();

    // Send the OTP email
    const mail = await sendEmail({
      sender: {
        name: "Store It",
        address: "storeit@example.com",
      },
      receipients: [{ name: "User", address: email }],
      subject: "OTP Verification",
      message: `<h1>Your OTP is: ${otp}</h1>`,
    });

    if (mail?.accepted?.length > 0) {
      return {
        success: true,
        message: "OTP sent successfully to your email.",
        status: 200,
        otp,
      };
    } else {
      return {
        success: false,
        message: "Failed to send the OTP. Please try again later.",
        status: 500,
      };
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "Internal server error. Please try again later.",
      status: 500,
    };
  }
};
