import React, { useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaImage,
  FaInfo,
  FaUser,
} from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";
import axios from "../axiosInstance";
import Loading from "./Loading";
import { FaMapLocationDot } from "react-icons/fa6";

const AddActivityForm = (props) => {
  const auth = useAuth();
  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    venue: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const loadingBarRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Add your validation logic here
    if (!activityData.name) {
      newErrors.name = "This field is required";
    }
    // Add validations for other fields as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }

      // Make a request to your backend API to add the activity
      const res = await axios.post("/hope/activities", activityData);

      toast.success(res.data.message);

      // Optionally, you can reset the form or perform other actions after adding the activity
      setActivityData({
        name: "",
        description: "",
        image: "",
        price: 0,
        venue: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      props.fetchActivities();
      setIsLoading(false);
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {auth.user &&
            (auth.user.role == "Admin" || auth.user.role == "Manager") && (
              <div className="actadd w-full mx-auto mt-8 mb-10 neumorphic-container backdrop-blur-lg">
                <h2 className="text-2xl text-zinc-100 font-bold mb-4">
                  {auth.user.name} Space - Add Activity
                </h2>
                <form onSubmit={onSubmit}>
                  <div className="mb-4 relative">
                    <label
                      htmlFor="name"
                      className="block text-gray-200 text-sm font-bold mb-2"
                    >
                      <FaUser className="inline-block mr-2" />
                      Activity Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={activityData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-4 border rounded-md"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-4 relative">
                    <label
                      htmlFor="description"
                      className="block text-gray-200 text-sm font-bold mb-2"
                    >
                      <FaInfo className="inline-block mr-2" />
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={activityData.description}
                      onChange={handleInputChange}
                      rows="7"
                      className="w-full text-white p-2 pl-4 border rounded-md"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 relative">
                    <label
                      htmlFor="image"
                      className="block text-gray-200 text-sm font-bold mb-2"
                    >
                      <FaImage className="inline-block mr-2" />
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={activityData.image}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-4 border rounded-md"
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                  </div>
                  <div className="mb-4 relative">
                    <label
                      htmlFor="venue"
                      className="block text-gray-200 text-sm font-bold mb-2"
                    >
                      <FaMapLocationDot className="inline-block mr-2" />
                      Venue
                    </label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={activityData.venue}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-4 border rounded-md"
                    />
                    {errors.venue && (
                      <p className="text-red-500 text-sm">{errors.venue}</p>
                    )}
                  </div>
                  <div className="mb-4 relative">
                    <label
                      htmlFor="price"
                      className="block text-gray-200 text-sm font-bold mb-2"
                    >
                      <FaDollarSign className="inline-block mr-2" />
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={activityData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-4 border rounded-md"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">{errors.price}</p>
                    )}
                  </div>

                  <div className="mb-4 relative">
                    <label
                      htmlFor="date"
                      className="block text-gray-200 text-sm font-bold mb-2"
                    >
                      <FaCalendarAlt className="inline-block mr-2" />
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={activityData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-4 border rounded-md"
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm">{errors.date}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`neumorphic-button border-green-300 text-green-300 px-6 py-3 rounded-lg hover:bg-green-300 hover:bg-opacity-20 hover:text-white focus:outline-none flex items-center justify-center ${
                      isLoading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="mr-2">Adding...</span>
                    ) : (
                      <>
                        <IoMdAddCircle className="mr-2" />
                        Add Activity
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
        </>
      )}
    </>
  );
};

export default AddActivityForm;
