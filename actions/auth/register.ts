"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/config";
import { User } from "@/models/auth/user";
import { sendEmail } from "@/utils";

const generateOtp = () => {
  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

export const createAccount = async (formdata: FormData) => {
  await connectDB();
  try {
    const fullName = formdata.get("fullName");
    const email = formdata.get("email");

    console.log("this is the data", fullName, email);

    if (!email || !fullName) {
      return {
        success: false,
        message: "All fields are required",
        status: 400,
      };
    }

    const existingUser = await User.findOne({
      $or: [{ email }],
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
        status: 400,
      };
    }

    const otp = generateOtp();

    const mail = await sendEmail({
      sender: {
        name: "Store it",
        address: "storeit@example.com",
      },
      receipients: [{ name: "John Doe", address: email as string }],
      subject: "OTP verification",
      message: `<h1>This is your otp:${otp}</h1>`,
    });

    if (mail.accepted?.length > 0) {
      return {
        success: true,
        message: "Email send successfully",
        status: 200,
      };
    }
    const user = new User({
      fullName,
      email,
    });

    await user.save();
    if (!user) {
      return {
        success: false,
        message: "Error creating user",
        status: 500,
      };
    }

    return {
      success: true,
      message: "User created successfully",
      status: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
