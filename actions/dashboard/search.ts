"use server";

import { connectDB } from "@/config";
import { parseStringify } from "@/lib/utils";
import { User } from "@/models/user/user";
import { jwtDecode } from "jwt-decode"; // Ensure you import the correct library
import { cookies } from "next/headers";

export const SearchFile = async ({ query }: { query: string }) => {
  await connectDB();

  try {
    // Get the access token from cookies
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

    if (!userId) {
      return { success: false, message: "Unauthorized access", status: 404 };
    }

    if (!query) {
      return {
        success: false,
        message: "Please provide a search query",
        status: 400,
      };
    }

    // Fetch the logged-in user with populated files, filtering by query
    const user = await User.findById(userId)
      .select("-password") // Exclude password for security
      .populate({
        path: "images",
        match: {
          $or: [
            { filename: { $regex: query, $options: "i" } }, // Match in image filenames
            { format: { $regex: query, $options: "i" } }, // Match in image formats
          ],
        },
      })
      .populate({
        path: "videos",
        match: {
          $or: [
            { filename: { $regex: query, $options: "i" } }, // Match in video filenames
            { format: { $regex: query, $options: "i" } }, // Match in video formats
          ],
        },
      })
      .populate({
        path: "documents",
        match: {
          $or: [
            { filename: { $regex: query, $options: "i" } }, // Match in document filenames
            { format: { $regex: query, $options: "i" } }, // Match in document formats
          ],
        },
      });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }

    // Filter out users with no matching related files
    const filteredFiles = {
      images: user.images,
      videos: user.videos,
      documents: user.documents,
    };

    if (
      filteredFiles.images.length === 0 &&
      filteredFiles.videos.length === 0 &&
      filteredFiles.documents.length === 0
    ) {
      return {
        success: false,
        message: "No matching files found",
        status: 404,
      };
    }

    interface File {
      _id: string;
      filename: string;
      format: string;
      type: string;
    }

    interface ImageFile extends File {
      type: "image";
    }

    interface VideoFile extends File {
      type: "video";
    }

    interface DocumentFile extends File {
      type: "document";
    }

    const allFiles: (ImageFile | VideoFile | DocumentFile)[] = [
      ...filteredFiles.images.map((file: ImageFile) => ({
        ...file,
        type: "image",
      })),
      ...filteredFiles.videos.map((file: VideoFile) => ({
        ...file,
        type: "video",
      })),
      ...filteredFiles.documents.map((file: DocumentFile) => ({
        ...file,
        type: "document",
      })),
    ];

    return {
      success: true,
      message: "Matching files found",
      status: 200,
      data: parseStringify(allFiles),
    };
  } catch (error) {
    console.error("Error during file search:", error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
