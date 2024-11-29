"use server";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDB } from "@/config";
import { Image } from "@/models/user/images";
import { User } from "@/models/user/user";
import { Video } from "@/models/user/videos";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadTypes {
  public_id: string;
  url: string;
  [key: string]: any;
}

export const uploadVideoToCloudinary = async ({
  id,
  formdata,
  path,
}: {
  formdata: FormData;
  path: string;
  id: string;
}) => {
  await connectDB();
  try {
    console.log(id);
    if (!id) {
      console.error("Missing userId");
      return {
        success: false,
        message: "Unauthorized access!",
        status: 401,
      };
    }

    const file = formdata.get("file") as File;
    if (!file || !file.name || !file.size) {
      console.error("Invalid file:", file);
      return {
        success: false,
        message: "Invalid or missing file",
        status: 400,
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<CloudinaryUploadTypes>(
      (resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: path || "Store-It_Videos",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              return reject(error);
            }
            resolve(result as any);
          }
        );

        upload_stream.end(buffer);
      }
    );

    if (!uploadResult) {
      return {
        success: false,
        message: "Error uploading file",
        status: 400,
      };
    }

    // Save Image to Database
    const videoDocument = await Video.create({
      url: uploadResult.url,
      filename: file.name,
      size: file.size,
      format: file.type,
    });

    await videoDocument.save();
    if (!videoDocument) {
      return {
        success: false,
        message: "Error saving image to database",
        status: 400,
      };
    }

    // Find and Update User
    const user = await User.findById(id).lean();
    if (!user) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { videos: videoDocument._id } }, // Append new image ID
      { new: true } // Return the updated document
    )
      .populate({
        path: "videos",
        options: { maxDepth: 1 },
      })
      .lean(true);
    if (!updatedUser) {
      return { success: false, message: "Error updating user", status: 500 };
    }

    console.log("path to revalidate", path);
    revalidatePath(path && "/");

    return {
      success: true,
      message: "File uploaded successfully",
      // updatedUser,
      status: 200,
    };
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
