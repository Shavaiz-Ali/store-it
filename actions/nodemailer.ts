"use server";

import { connectDB } from "@/config";
import { User } from "@/models/user/user";
import { sendEmail } from "@/utils";
import jwt from "jsonwebtoken";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const generateExpiryTime = () => {
  return Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes from now
};

export const sendOTP = async (formData: FormData) => {
  await connectDB();

  try {
    const email = formData.get("email") as string;

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
        message: "Email already exists. Please login!.",
        status: 409,
      };
    }

    // Generate OTP
    const otp = generateOtp();
    const expiryTime = generateExpiryTime();

    // Send the OTP email
    const mail = await sendEmail({
      sender: {
        name: "Store It",
        address: "storeit@example.com",
      },
      receipients: [{ name: "User", address: email }],
      subject: "OTP Verification",
      message: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border: 1px solid       #e0e0e0; border-radius: 8px; max-width: 400px; margin: 20px auto; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #FA7275; font-size: 24px; margin-bottom: 10px;">Your OTP Code</h1>
          <p style="font-size: 18px; color: #555; margin-bottom: 20px;">Use the code below to proceed with your request:</p>
          <div style="background-color: #f0f0f0; padding: 10px 20px; display: inline-block; border-radius: 4px; border: 1px dashed #ccc; font-size: 22px; color: #333; font-weight: bold;">
        ${otp}
      </div>
      <p style="font-size: 14px; color: #999; margin-top: 20px;">This code is valid for 10 minutes. Do not share it with anyone.</p>
    </div>
`,
    });

    if (mail?.accepted?.length > 0) {
      const encryptedOtp = await jwt.sign({ otp }, "sjldfdsIW65874", {
        expiresIn: expiryTime,
      });
      return {
        success: true,
        message: "OTP sent successfully to your email.",
        status: 200,
        otp: encryptedOtp,
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
