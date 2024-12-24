"use server";

import { connectDB } from "@/config";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseStringify } from "@/lib/utils";
import { Document } from "@/models/user/documents";
import { Image } from "@/models/user/images";
import { User } from "@/models/user/user";
import { Video } from "@/models/user/videos";

export const getFileDetails = async ({
  userId,
  fileId,
  fileType,
}: {
  userId: string;
  fileId: string;
  fileType: string;
}) => {
  await connectDB();
  try {
    if (!userId || !fileId || !fileType) {
      return {
        success: false,
        message: "userId, fileId, and newName are required!",
        status: 400,
      };
    }

    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "User not found!",
        status: 404,
      };
    }
    const modelMap: any = {
      images: Image,
      videos: Video,
      documents: Document,
    };

    const referenceKeyMap: any = {
      images: "images",
      videos: "videos",
      documents: "documents",
    };

    // Ensure the provided fileType is valid
    const FileModel = modelMap[fileType];
    const referenceKey = referenceKeyMap[fileType];

    if (!FileModel || !referenceKey) {
      return {
        success: false,
        message: "Invalid file type!",
        status: 400,
      };
    }

    if (!user[referenceKey].includes(fileId)) {
      return {
        success: false,
        message: "File not found in user's collection!",
        status: 404,
      };
    }

    const file = await FileModel.findById(fileId);
    if (!file) {
      return {
        success: false,
        message: "File not found in the database!",
        status: 404,
      };
    }

    return {
      success: true,
      message: "File details retrieved successfully!",
      status: 200,
      data: parseStringify(file),
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
