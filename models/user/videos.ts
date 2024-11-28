import mongoose from "mongoose";

const videosSchema = new mongoose.Schema(
  {
    url: {
      type: String,
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

const Video = mongoose.models.Video || mongoose.model("Video", videosSchema);
export { Video };
