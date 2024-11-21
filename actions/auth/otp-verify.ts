/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

export const verifyOTP = async ({
  token,
  userOTP,
}: {
  token: number;
  userOTP: string;
}) => {
  if (!token || !userOTP) {
    return {
      success: false,
      message: "OTP and token are required!",
      status: 400,
    };
  }

  try {
    const otp: string = token.toString();
    const decoded = jwt.verify(otp, "sjldfdsIW65874") as unknown as {
      otp: number;
    };

    if (decoded.otp.toString().trim() === userOTP.toString().trim()) {
      return {
        success: true,
        message: "OTP verified successfully!",
        status: 200,
      };
    } else {
      return {
        success: false,
        message: "Invalid OTP!",
        status: 401,
      };
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return {
        success: false,
        message: "OTP has expired!",
        status: 401,
      };
    }
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
      status: 500,
    };
  }
};
