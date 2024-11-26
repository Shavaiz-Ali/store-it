/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { connectDB } from "@/config";
import { Image } from "@/models/user/images";
import { User } from "@/models/user/user";
import { v2 as cloudinary } from "cloudinary";

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

export const uploadImageToCloudinary = async ({
  formdata,
  path,
  userId,
}: {
  formdata: FormData;
  path: string;
  userId: string;
}) => {
  await connectDB();
  try {
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized access!",
        status: 401,
      };
    }

    const file = formdata.get("file") as File;
    if (!file) {
      return {
        success: false,
        message: "File not found or invalid",
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
            resource_type: "image",
            folder: "Store-It_images",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        upload_stream.end(buffer);
      }
    );

    if (!uploadResult) {
      return { success: false, message: "Error uploading file", status: 400 };
    }

    // Save Image to Database
    const imageDocument = new Image({
      url: uploadResult.url,
      filename: file.name,
      size: file.size,
      format: file.type,
    });

    await imageDocument.save();

    // Find and Update User
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found", status: 404 };
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { images: imageDocument._id },
      { new: true }
    ).populate("image");

    if (!updateUser) {
      return { success: false, message: "Error updating user", status: 500 };
    }

    return {
      success: true,
      message: "File uploaded successfully",
      updateUser,
      status: 200,
    };
  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, message: "Internal server error", status: 500 };
  }
};
