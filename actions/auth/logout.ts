"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  try {
    const cookieStore = await cookies();

    // Clear cookies with all possible options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    };

    // Remove cookies
    cookieStore.delete("accessToken");

    // Set empty cookies as backup
    cookieStore.set("accessToken", "", cookieOptions);

    return {
      success: true,
      message: "Logged out successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error", status: 500 };
  }
};
