import mongoose from "mongoose";

const othersSchema = new mongoose.Schema(
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

const Other = mongoose.model("Other", othersSchema);
export { Other };
