import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema(
  {
    url: {
      type: String, // Use a single string for the image URL
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.models.Image || mongoose.model("Image", imagesSchema);
export { Image };
