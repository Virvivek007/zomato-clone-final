import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import nightlifeContext from "../../context/GlobalContext/nightlifeContext";
import Navbar from "../Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

const NightlifeDetail = () => {
  const context = useContext(nightlifeContext);
  const { nightlifes } = context;

  const { id } = useParams();

  // Find the item with the matching ID
  const item = nightlifes?.find((i) => i.id === parseInt(id));

  // Handle case where item is not found
  if (!item) {
    return <div>Item not found</div>;
  }

  const navigate = useNavigate();

  // Bookmark onClick Implementation
  const [isBookmark, setIsBookmark] = useState(false);

  const toggleBookmark = () => {
    // Check if the user is logged in (token exists and is valid)
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      // Redirect to the login page if the user is not logged in
      navigate("/login");
    } else {
      setIsBookmark(!isBookmark);
    }
  };

  return (
    <>
      <Navbar />
      <div className="ml-3">
        <div className="flex mt-8 ml-2">
          {/* Item Image */}
          <img
            className="w-[40rem] h-[25rem] ml-4"
            src={item.image}
            alt={item.name}
          />
        </div>
        {/* Title and Description */}
        <div className="ml-6 mt-4 space-y-2">
          <p className="text-3xl">{item.name}</p>
          <p className="text-lg">{item.address}</p>
        </div>
        {/* Bookmark */}
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

        {/* Generic Overview of the Product */}
        <div className="text-base ml-4 mt-6">
          <p>
            Welcome to our culinary haven, where every dish is crafted with
            meticulous attention to detail and a passion for perfection. Nestled
            in the heart of the city, our restaurant beckons you to embark on a
            gastronomic journey like no other.
          </p>
          <p>
            Step through our doors and into a world where flavors dance on your
            palate and aromas tantalize your senses. From the moment you arrive,
            our warm and inviting ambiance envelops you, setting the stage for
            an unforgettable dining experience.
          </p>
          <p>
            Our chefs, masters of their craft, draw inspiration from both
            tradition and innovation, curating a menu that delights and
            surprises at every turn.
          </p>
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

export default NightlifeDetail;