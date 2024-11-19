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
