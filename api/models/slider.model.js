import mongoose from "mongoose";

const sliderImageSchema = new mongoose.Schema(
  {
    sliderImage: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slider = mongoose.model("SliderImage", sliderImageSchema);

export default SliderImage;
