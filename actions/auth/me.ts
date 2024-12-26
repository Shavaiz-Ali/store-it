"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { User } from "@/models/user/user";
import { connectDB } from "@/config";
import mongoose from "mongoose";
import { jwtDecode } from "jwt-decode";

export const loggedInUser = async () => {
  await connectDB();
  try {
    const token = (await cookies()).get("accessToken");
    if (!token) {
      return { success: false, message: "No access token found", status: 401 };
    }

    // Decode token securely
    const decodedToken = jwtDecode<{ userId: string; exp: number }>(
      token.value as string
    );

    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
      return { success: false, message: "Access token expired", status: 401 };
    }

    const userId = decodedToken.userId;
    // console.log("Decoded User ID:", userId);

    const user = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "images",
          localField: "images",
          foreignField: "_id",
          as: "images",
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "videos",
          foreignField: "_id",
          as: "videos",
        },
      },
      {
        $lookup: {
          from: "documents",
          localField: "documents",
          foreignField: "_id",
          as: "documents",
        },
      },
      {
        $project: {
          fullName: 1,
          email: 1,
          images: 1, // Include full images array
          videos: 1, // Include full videos array
          documents: 1, // Include full documents array
        },
      },
    ]);

    if (!user || user.length === 0) {
      return { success: false, message: "User not found!", status: 404 };
    }

    // Combine all uploads into a single array
    const allUploads = [
      ...user[0].images.map((image: any) => ({
        ...image,
        type: "image", // Add a type field for identification
        _id: image._id.toString(),
        createdAt: image.createdAt?.toISOString(),
      })),
      ...user[0].videos.map((video: any) => ({
        ...video,
        type: "video",
        _id: video._id.toString(),
        createdAt: video.createdAt?.toISOString(),
      })),
      ...user[0].documents.map((document: any) => ({
        ...document,
        type: "document",
        _id: document._id.toString(),
        createdAt: document.createdAt?.toISOString(),
      })),
    ];

    // Sort the combined array by createdAt in descending order
    const recentUploads = allUploads
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 8); // Limit to the 10 most recent uploads

    // Serialize the user data
    const serializedUser = {
      _id: user[0]._id.toString(),
      fullName: user[0].fullName,
      email: user[0].email,
      images: user[0].images.map((image: any) => ({
        ...image,
        _id: image._id.toString(),
        createdAt: image.createdAt?.toISOString(),
      })), // Full images array
      videos: user[0].videos.map((video: any) => ({
        ...video,
        _id: video._id.toString(),
        createdAt: video.createdAt?.toISOString(),
      })), // Full videos array
      documents: user[0].documents.map((document: any) => ({
        ...document,
        _id: document._id.toString(),
        createdAt: document.createdAt?.toISOString(),
      })), // Full documents array
      recentUploads, // Combined and sorted recent uploads
    };

    return {
      success: true,
      message: "User authenticated successfully",
      user: serializedUser,
      status: 200,
    };
  } catch (error) {
    console.error("Error in loggedInUser:", error);
    return { success: false, message: "Internal server error", status: 500 };
  }
};
