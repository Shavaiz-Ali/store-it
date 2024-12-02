"use server";

import { connectDB } from "@/config";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/models/user/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getFilesSize = async ({ type }: string | any) => {
  console.log("this is type", type);
  await connectDB();
  try {
    const token = (await cookies()).get("accessToken");
    if (!token) {
      return { success: false, message: "No access token found", status: 401 };
    }

    console.log("Access Token:", token.value);

    // Decode token securely
    const decodedToken = jwtDecode<{ userId: string; exp: number }>(
      token.value as string
    );

    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
      return { success: false, message: "Access token expired", status: 401 };
    }

    const user = await User.findById(decodedToken?.userId).populate(type);

    if (!user) {
      return { success: false, message: "User not found", status: 404 };
    }

    if (type) {
      let size: null | any = null;

      user?.[type].forEach((file: any) => {
        if (file?.size) {
          size += file?.size;
        }
      });

      return size;
    }

    return {
      success: false,
      message: "Unable to calculate size",
      status: 500,
    };

    // if (type === "Images") {
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error",
      type,
      status: 500,
    };
  }
};
