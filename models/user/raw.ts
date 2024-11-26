import mongoose from "mongoose";

const rawSchema = new mongoose.Schema(
  {
    url: {
      type: [String],
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

const Raw = mongoose.model("Raw", rawSchema);
export { Raw };
