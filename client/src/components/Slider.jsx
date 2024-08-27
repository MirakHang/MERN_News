// import React, { useEffect, useState } from "react";
// // Initialization for ES Users
// import { Carousel, initTWE } from "tw-elements";

// initTWE({ Carousel });

// const Slider = () => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     const fetchSliderImage = async () => {
//       try {
//         const res = await fetch(`/api/sliderimage/getsliderimage`);
//         const data = await res.json();
//         if (Array.isArray(data.sliderimages) && data.sliderimages.length > 0) {
//           setFormData(data.sliderimages[0]);
//         } else {
//           setFormData({});
//         }
//       } catch (error) {
//         next(error);
//       }
//     };
//     fetchSliderImage();
//   }, []);

//   return (
//     <div>
//       <div
//         id="default-carousel"
//         className="relative w-full py-4 px-3 flex justify-center items-center mx-auto"
//         data-carousel="slide"
//       >
//         <div className="relative h-56 overflow-hidden rounded-sm md:h-96 container z-0">
//           <div className="hidden duration-700 ease-in-out" data-carousel-item>
//             <img
//               src={formData.sliderImageOne}
//               className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-72 xl:h-96"
//               alt="..."
//             />
//           </div>
//           <div className="hidden duration-700 ease-in-out" data-carousel-item>
//             <img
//               src={formData.sliderImageTwo}
//               className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-72 xl:h-96"
//               alt="..."
//             />
//           </div>
//           <div className="hidden duration-700 ease-in-out" data-carousel-item>
//             <img
//               src={formData.sliderImageThree}
//               className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-40 sm:h-48 md:h-64 lg:h-72 xl:h-96"
//               alt="..."
//             />
//           </div>
//         </div>

//         <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
//           <button
//             type="button"
//             className="w-3 h-3 rounded-full"
//             aria-current="true"
//             aria-label="Slide 1"
//             data-carousel-slide-to="0"
//           ></button>
//           <button
//             type="button"
//             className="w-3 h-3 rounded-full"
//             aria-current="false"
//             aria-label="Slide 2"
//             data-carousel-slide-to="1"
//           ></button>
//           <button
//             type="button"
//             className="w-3 h-3 rounded-full"
//             aria-current="false"
//             aria-label="Slide 3"
//             data-carousel-slide-to="2"
//           ></button>
//         </div>
//         <button
//           type="button"
//           className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           data-carousel-prev
//         >
//           <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg
//               className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 6 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 1 1 5l4 4"
//               />
//             </svg>
//             <span className="sr-only">Previous</span>
//           </span>
//         </button>
//         <button
//           type="button"
//           className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
//           data-carousel-next
//         >
//           <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//             <svg
//               className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 6 10"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 9 4-4-4-4"
//               />
//             </svg>
//             <span className="sr-only">Next</span>
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Slider;

import React, { useEffect, useState } from "react";

const Slider = () => {
  const [image, setImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [height, setHeight] = useState("10px"); // Default height

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 768) {
        // Example breakpoint for medium screens
        setHeight("310px"); // Height for medium screens and above
      } else {
        setHeight("200px"); // Height for small screens
      }
    };

    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight); // Update height on window resize

    return () => {
      window.removeEventListener("resize", updateHeight); // Cleanup listener on unmount
    };
  }, []);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch("/api/sliderimage/getsliderimage");
        const data = await res.json();

        // Check if the sliderimages array exists and is not empty
        if (data.sliderimages && data.sliderimages.length > 0) {
          // Access the first object in the sliderimages array
          const sliderImages = data.sliderimages[0];

          // Convert object into array of image URLs
          const imageUrls = [
            sliderImages.sliderImageOne,
            sliderImages.sliderImageTwo,
            sliderImages.sliderImageThree,
          ];

          setImage(imageUrls);
        } else {
          console.error("No slider images found in the response.");
        }
      } catch (error) {
        console.error("Error fetching slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [image.length]);

  return (
    <div className="relative overflow-hidden w-full pt-2" style={{ height }}>
      <div className="flex items-center justify-between gap-6 z-30 absolute top-0 bottom-0 w-full px-4">
        <button
          className="z-40 bg-gray-800 text-white p-2 rounded-full h-10 w-10"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + image.length) % image.length
            )
          }
        >
          &#10094;
        </button>
        <button
          className="z-40   text-white p-2 rounded-full w-10 h-10"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % image.length)
          }
        >
          &#10095;
        </button>
      </div>
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {image.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
