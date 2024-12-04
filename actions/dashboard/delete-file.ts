"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from "@/models/user/documents";
import { Image } from "@/models/user/images";
import { User } from "@/models/user/user";
import { Video } from "@/models/user/videos";
import { revalidatePath } from "next/cache";

export const deleteFile = async ({
  userId,
  fileId,
  fileType,
  pathname,
}: {
  userId: string;
  fileId: string;
  fileType: string;
  pathname: string;
}) => {
  try {
    console.log("userId: " + userId);
    console.log("fileId: " + fileId);
    console.log("fileType: " + fileType);
    console.log("pathname: " + pathname);
    if (!userId || !fileId) {
      return {
        success: false,
        message: "image id and userId are required!",
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

    // Map file types to their respective models
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

    await User.findByIdAndUpdate(userId, {
      $pull: { [referenceKey]: fileId },
    });

    // Delete the file from the respective collection
    await FileModel.findByIdAndDelete(fileId);

    revalidatePath(pathname);

    return {
      success: true,
      message: "File deleted successfully!",
      status: 200,
    };

    // const fileExists
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error!",
      status: 500,
    };
  }
};
