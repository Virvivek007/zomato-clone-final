import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

const DeliveryProductDetail = () => {
  const [item, setItem] = useState(null); // State for item data
  const [isBookmark, setIsBookmark] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        navigate("/login");
      } else {
        setIsBookmark((prev) => !prev);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get("https://your-backend-api.com/api/item/1"); // Replace with your API endpoint
        setItem(response.data); // Assuming the API response matches your data structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItemData();
  }, []);

  if (!item) {
    return <p>Loading...</p>; // Placeholder while data is loading
  }

  return (
    <>
      <Navbar />
      <div className="ml-3">
        {/* Item Image */}
        <div className="flex mt-8 ml-2">
          <img
            className="w-[40rem] h-[25rem] ml-4"
            src={item.image}
            alt={item.title}
          />
        </div>
        {/* Title and Description */}
        <div className="ml-6 mt-4 space-y-2">
          <p className="text-3xl">{item.title}</p>
          <p className="text-lg">{item.description}</p>
        </div>
        {/* Bookmark Section */}
        <div className="m-8 flex justify-start items-center space-x-10">
          <p className="text-lg font-semibold">Overview</p>
          <div
            className={`bookmark border-2 border-gray-400 rounded-md cursor-pointer w-28 h-9 flex justify-around items-center ${
              isBookmark ? "bg-red-400" : ""
            }`}
            onClick={toggleBookmark}
          >
            <FontAwesomeIcon icon={faBookmark} />
            <p>Bookmark</p>
          </div>
        </div>

        {/* Border */}
        <div className="line-1 border-b border-gray-400 mx-4 mt-1"></div>

        {/* Generic Overview */}
        <div className="text-base ml-4 mt-6">
          <p>
            Welcome to our culinary haven, where every dish is crafted with
            meticulous attention to detail and a passion for perfection...
          </p>
        </div>

        <div className="line-1 border-b border-gray-400 mx-4 mt-6"></div>

        {/* Dishes Section */}
        <div className="m-6">
          <p className="text-xl font-semibold">Dishes</p>
          <ul className="space-y-4">
            {item.dishes.map((dish) => (
              <li key={dish.id} className="border p-4 rounded-md">
                <p className="text-lg font-semibold">{dish.name}</p>
                <p>{dish.description}</p>
                <p className="text-sm font-bold">{dish.price}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="line-1 border-b border-gray-400 mx-4 mt-6"></div>

        {/* More Info */}
        <div className="m-6 space-y-2">
          <p className="text-xl font-semibold">More Info</p>
          <ul className="space-y-2">
            <li>
              <FontAwesomeIcon icon={faCircleCheck} /> Breakfast
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleCheck} /> Home Delivery
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleCheck} /> Takeaway Available
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleCheck} /> Desserts and Bakes
            </li>
            <li>
              <FontAwesomeIcon icon={faCircleCheck} /> Indoor Seating
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DeliveryProductDetail;