/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
export const verifyOTP = async ({
  token,
  userOTP,
}: {
  token: string;
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
    // const otp: string = token.toString();
    const decodedToken = jwtDecode<{ otp: string; exp: number }>(token as any);

    if (decodedToken.otp.toString().trim() === userOTP.toString().trim()) {
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
