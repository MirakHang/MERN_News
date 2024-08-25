import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Button, FileInput } from "flowbite-react";

export default function ChangeSliderImages() {
  const { imageId } = useParams();
  const [file, setFile] = useState(null); // Changed to null
  const navigate = useNavigate();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadProgress2, setImageUploadProgress2] = useState(null);
  const [imageUploadError2, setImageUploadError2] = useState(null);
  const [imageUploadProgress3, setImageUploadProgress3] = useState(null);
  const [imageUploadError3, setImageUploadError3] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please upload an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, sliderImageOne: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      // console.log(error);
    }
  };
  console.log(formData, "111");
  const handleUploadImage2 = async () => {
    try {
      if (!file) {
        setImageUploadError2("Please upload an image");
        return;
      }
      setImageUploadError2(null);
      const storage2 = getStorage(app);
      const fileName2 = new Date().getTime() + "-" + file.name;
      const storageRef2 = ref(storage2, fileName2);
      const uploadTask2 = uploadBytesResumable(storageRef2, file);
      uploadTask2.on(
        "state_changed",
        (snapshot) => {
          const progress2 =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress2(progress2.toFixed(0));
        },
        (error) => {
          setImageUploadError2("Image upload failed");
          setImageUploadProgress2(null);
        },
        () => {
          getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress2(null);
            setImageUploadError2(null);
            setFormData({ ...formData, sliderImageTwo: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError2("Image upload failed");
      setImageUploadProgress2(null);
      // console.log(error);
    }
  };
  const handleUploadImage3 = async () => {
    try {
      if (!file) {
        setImageUploadError3("Please upload an image");
        return;
      }
      setImageUploadError3(null);
      const storage3 = getStorage(app);
      const fileName3 = new Date().getTime() + "-" + file.name;
      const storageRef3 = ref(storage3, fileName3);
      const uploadTask3 = uploadBytesResumable(storageRef3, file);
      uploadTask3.on(
        "state_changed",
        (snapshot) => {
          const progress3 =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress3(progress3.toFixed(0));
        },
        (error) => {
          setImageUploadError3("Image upload failed");
          setImageUploadProgress3(null);
        },
        () => {
          getDownloadURL(uploadTask3.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress3(null);
            setImageUploadError3(null);
            setFormData({ ...formData, sliderImageThree: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      // console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await fetch(
        `/api/sliderimage/updatesliderimage/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/sliderimage/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  // fetching slider images
  useEffect(() => {
    const fetchSliderImage = async () => {
      try {
        const res = await fetch(
          `/api/sliderimage/getsliderimage?userId=${currentUser._id}`
        );
        const data = await res.json();

        // Check if data.sliderimages is an array and contains at least one object
        if (Array.isArray(data.sliderimages) && data.sliderimages.length > 0) {
          setFormData(data.sliderimages[0]); // Set the first object in the array
        } else {
          setFormData({}); // Set to an empty object if no images are available
        }
      } catch (error) {
        console.error("Failed to fetch slider images:", error);
        setFormData({}); // Optionally handle errors and set to an empty object
      }
    };

    fetchSliderImage();
  }, [currentUser._id]);

  return (
    <div className="flex justify-center items-center my-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Upload Slider Images
        </h1>

        <form
          id="sliderImageForm"
          action="/upload"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="sliderImageOne"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Slider Image One
            </label>

            <div
              className="flex flex-col md:flex-row lg-flex-row sm:flex-row gap-4 items-center justify-between border-dotted p-3"
              style={{ border: "red", border: "dashed", borderWidth: "1px" }}
            >
              <div>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={handleUploadImage}
                  size="sm"
                  className="!dark:bg-red-500 bg-gray-500"
                  disabled={imageUploadProgress !== null} // Disable only if progress is not null
                >
                  {imageUploadProgress ? (
                    <div className="w-16 h-16 ">
                      <CircularProgressbar
                        value={imageUploadProgress}
                        text={`${imageUploadProgress || 0}%`}
                      />
                    </div>
                  ) : (
                    "Upload Image"
                  )}
                </Button>
              </div>
            </div>
          </div>
          {imageUploadError && (
            <Alert color="failure">{imageUploadError}</Alert>
          )}
          {formData?.sliderImageOne ? (
            <img
              src={formData.sliderImageOne}
              alt="Slider Image One"
              className="w-full h-56 object-cover rounded-md shadow-lg"
            />
          ) : (
            <p>Please choose an Image</p>
          )}

          <div>
            <label
              htmlFor="sliderImageOne"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Slider Image Two
            </label>

            <div
              className="flex flex-col md:flex-row lg-flex-row sm:flex-row gap-4 items-center justify-between border-dotted p-3"
              style={{ border: "red", border: "dashed", borderWidth: "1px" }}
            >
              <div>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={handleUploadImage2}
                  size="sm"
                  className="!dark:bg-red-500 bg-gray-500"
                  disabled={imageUploadProgress2 !== null} // Disable only if progress is not null
                >
                  {imageUploadProgress2 ? (
                    <div className="w-16 h-16 ">
                      <CircularProgressbar
                        value={imageUploadProgress2}
                        text={`${imageUploadProgress2 || 0}%`}
                      />
                    </div>
                  ) : (
                    "Upload Image"
                  )}
                </Button>
              </div>
            </div>
          </div>
          {imageUploadError2 && (
            <Alert color="failure">{imageUploadError2}</Alert>
          )}
          {formData?.sliderImageTwo ? (
            <img
              src={formData.sliderImageTwo}
              alt="Slider Image One"
              className="w-full h-72 object-cover rounded-md shadow-lg"
            />
          ) : (
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-md">
              <span className="text-gray-500">No image available</span>
            </div>
          )}

          <div>
            <label
              htmlFor="sliderImageOne"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Slider Image Three
            </label>

            <div
              className="flex flex-col md:flex-row lg-flex-row sm:flex-row gap-4 items-center justify-between border-dotted p-3"
              style={{ border: "red", border: "dashed", borderWidth: "1px" }}
            >
              <div>
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={handleUploadImage3}
                  size="sm"
                  className="!dark:bg-red-500 bg-gray-500"
                  disabled={imageUploadProgress3 !== null} // Disable only if progress is not null
                >
                  {imageUploadProgress3 ? (
                    <div className="w-16 h-16 ">
                      <CircularProgressbar
                        value={imageUploadProgress3}
                        text={`${imageUploadProgress3 || 0}%`}
                      />
                    </div>
                  ) : (
                    "Upload Image"
                  )}
                </Button>
              </div>
            </div>
          </div>
          {imageUploadError3 && (
            <Alert color="failure">{imageUploadError3}</Alert>
          )}
          {formData?.sliderImageThree ? (
            <img
              src={formData.sliderImageThree}
              alt="Slider Image One"
              className="w-full h-56 object-cover rounded-md shadow-lg"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-md">
              <span className="text-gray-500">No image available</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
