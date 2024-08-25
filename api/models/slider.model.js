import mongoose from "mongoose";

const sliderImageSchema = new mongoose.Schema(
  {
    imageId: {
      type: String,
      required: true,
    },
    sliderImageOne: {
      type: String,
      required: true,
      unique: true,
    },
    sliderImageTwo: {
      type: String,
      required: true,
      unique: true,
    },
    sliderImageThree: {
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

export default Slider;
