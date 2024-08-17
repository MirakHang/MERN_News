import React, { useEffect, useState } from "react";
import image1 from "../assets/image-1.jpg";
import image2 from "../assets/image-2.webp";
import image3 from "../assets/image-3.jpg";

const Slider = () => {
  const sliderImages = [image1, image2, image3];
  return (
    <div>
      <div
        id="default-carousel"
        className="relative w-full py-4 px-3 flex justify-center items-center mx-auto"
        data-carousel="slide"
      >
        {/* <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={image1}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:h-28 md:h-64 lg:h-80 xl:h-96"
              alt="..."
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={image2}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96"
              alt="..."
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={image3}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96"
              alt="..."
            />
          </div>
        </div> */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96 container z-0">
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={image1}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-72 xl:h-96"
              alt="..."
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={image2}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-72 xl:h-96"
              alt="..."
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={image3}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-72 xl:h-96"
              alt="..."
            />
          </div>
        </div>

        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
        </div>
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
