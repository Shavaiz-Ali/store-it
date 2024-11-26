import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      required: false,
    },
    videos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video",
      required: false,
    },
    documents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "document",
      required: false,
    },
    others: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "other",
      required: false,
    },
    accessToken: {
      type: String,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose?.models?.User || mongoose.model("User", userSchema);

export { User };
