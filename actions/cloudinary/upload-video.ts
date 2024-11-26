"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { v2 as cloudinary } from "cloudinary";

const cloudinaryUpload = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface cloudinaryUploadTypes {
  public_id: string;
  [key: string]: any;
}

export const uploadImageToCloudinary = async (formdata: FormData) => {
  try {
    console.log(formdata);
    const file = formdata.get("file") as File;
    console.log(file);
    if (!file)
      return { success: false, message: "File not found", status: 400 };

    const bytes = await file.arrayBuffer(); // Await the arrayBuffer promise
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<cloudinaryUploadTypes>(
      (resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "Store-It_video",
          },
          (error: any, result: any) => {
            if (error) return reject(error);
            else resolve(result);
          }
        );

        upload_stream.end(buffer);
      }
    );

    if (!uploadResult)
      return { success: false, message: "Error uploading file", status: 400 };

    return {
      success: true,
      message: "file uploaded successfully",
      url: uploadResult.url,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal server error", status: 500 };
  }
};
