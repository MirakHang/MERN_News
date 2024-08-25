import SliderImage from "../models/slider.model.js";
import { errorHandler } from "../utils/error.js";

export const addsliderimage = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "You are not allowed to add images"));
  }
  if (
    !req.body.sliderImageOne ||
    !req.body.sliderImageTwo ||
    !req.body.sliderImageThree
  ) {
    return next(errorHandler(400, "Please upload an image"));
  }
  const newSliderImage = new SliderImage({
    ...req,
    imageId: req.user.id,
    sliderImageOne: req.body.sliderImageOne,
    sliderImageTwo: req.body.sliderImageTwo,
    sliderImageThree: req.body.sliderImageThree,
  });
  try {
    const savedSliderImage = await newSliderImage.save();
    res.status(201).json(savedSliderImage);
  } catch (error) {
    next(error);
  }
};

export const getsliderimages = async (req, res, next) => {
  try {
    const filter = {
      ...(req.query.imageId && { _id: req.query.imageId }), // Filter by playerId (assuming ObjectId)
      ...(req.query.sliderImageOne && {
        sliderImageOne: req.query.sliderImageOne,
        sliderImageTwo: req.query.sliderImageTwo,
        sliderImageThree: req.query.sliderImageThree,
      }),
    };

    // Query slider images with pagination and sorting
    const sliderimages = await SliderImage.find(filter);

    const now = new Date();

    console.log(sliderimages); // Log the fetched players
    res.status(200).json({
      sliderimages,
    });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
};

export const updatesliderimage = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this"));
  }
  try {
    const updatesliderimage = await SliderImage.findByIdAndUpdate(
      req.params.imageId,
      {
        $set: {
          sliderImageOne: req.body.sliderImageOne,
          sliderImageTwo: req.body.sliderImageTwo,
          sliderImageThree: req.body.sliderImageThree,
        },
      },
      { new: true }
    );
    res.status(200).json(updatesliderimage);
  } catch (error) {
    next(error);
  }
};
