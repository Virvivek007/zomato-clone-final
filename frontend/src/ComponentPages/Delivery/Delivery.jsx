import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../components/LoadingSpinner";
import appContext from "../../context/GlobalContext/appContext";
import FilterModal from "../Modals/FilterModal";

const Navbar = lazy(() => import("../Navbar"));
const Footer = lazy(() => import("../Footer"));
const Cards = lazy(() => import("../Cards"));

const Delivery = ({ showAlert }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]); // Local state for dishes data
  const [query, setQuery] = useState("");

  const location = useLocation();
  const isDeliveryPage = location.pathname === "/order-online";

  // Rating
  const [isRating, setIsRating] = useState(false);
  const handleRating = useCallback(() => setIsRating((prev) => !prev), []);

  // Pure Veg
  const [isVeg, setIsVeg] = useState(false);
  const handleVeg = useCallback(() => setIsVeg((prev) => !prev), []);

  // Filters
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => setShowFilter(!showFilter);
  const filterRatingValue = useCallback((element) => setRating(element), []);
  const filterSortByValue = useCallback((element) => setSortBy(element), []);

  // Fetch dishes from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/api/dishes"); // Replace with your API endpoint
        const result = await response.json();
        setData(result); // Set fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dishes:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort data
  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        if (rating && item.rating < rating) return false;
        if (isVeg && !item.isVegetarian) return false; // Use "isVegetarian" from the schema
        if (isRating && item.rating < 4.0) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "Rating: High to Low":
            return b.rating - a.rating;
          case "Delivery Time":
            return a.time - b.time;
          case "Cost: Low to High":
            return a.price - b.price;
          case "Cost: High to Low":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [data, rating, sortBy, isVeg, isRating]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar showAlert={showAlert} setQuery={setQuery} />
      </Suspense>

      {/* Section Bar */}
      <div className="mt-4 px-4 sm:px-8 overflow-x-auto no-scrollbar">
        <div className="flex min-w-min space-x-6 sm:space-x-12 pb-2">
          <Link to="/order-online">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <img
                className={`w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full ${
                  isDeliveryPage ? "bg-yellow-100" : ""
                }`}
                src="/del_logo.avif"
                alt=""
              />
              <p className="text-red-500 text-sm sm:text-base">Delivery</p>
            </div>
          </Link>

          <Link to="/dine-out">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full grayscale"
                src="/dine1.avif"
                alt=""
              />
              <p className="text-gray-800 text-sm sm:text-base">Dining Out</p>
            </div>
          </Link>

          <Link to="/nightlife">
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 p-2 rounded-full grayscale"
                src="/night1.webp"
                alt=""
              />
              <p className="text-gray-800 text-sm sm:text-base">Nightlife</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="border-b border-gray-400 mx-4 sm:mx-8"></div>

      {/* Filters Section */}
      <div className="px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2 items-center w-full">
          <button
            onClick={toggleFilter}
            className="min-w-[5rem] h-8 px-3 border-2 border-gray-400 rounded-lg text-sm"
          >
            Filters
          </button>
        </div>

        <FilterModal
          showFilter={showFilter}
          toggleFilter={toggleFilter}
          filterRatingValue={filterRatingValue}
          filterSortByValue={filterSortByValue}
        />
      </div>

      {/* Products Grid */}
      <div className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredData.map((item) => (
            <Link
              className="block w-full transform transition-transform duration-300 hover:scale-[1.02]"
              key={item._id}
              to={`/order-online/delivery-detail/${item._id}`}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Cards
                  title={item.name}
                  rating={item.rating}
                  description={item.description}
                  price={item.price}
                  time={item.time}
                  image={item.image}
                />
              </Suspense>
            </Link>
          ))}
        </div>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Delivery;