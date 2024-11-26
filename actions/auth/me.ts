"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { User } from "@/models/user/user";
import { connectDB } from "@/config";

export const loggedInUser = async () => {
  await connectDB();
  try {
    const token = (await cookies()).get("accessToken");
    if (!token) {
      return { success: false, message: "No access token found", status: 401 };
    }

    console.log(token.value);

    const decodedToken = jwtDecode<{ userId: string; exp: number }>(
      token.value as any
    );

    console.log(decodedToken.userId);
    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
      return { success: false, message: "Access token expired", status: 401 };
    }

    const userid = decodedToken.userId;
    console.log(userid);

    const user = await User.findById(userid).select("-password -accessToken");
    console.log(user);
    if (!user) {
      return {
        success: false,
        message: "User not found!",
        status: 404,
      };
    }

    return {
      success: true,
      message: "User authenticated successfully",
      user,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error", status: 500 };
  }
};
