import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios";

const LoginModal = ({ showAlert }) => {
  const VITE_URL = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${VITE_URL}/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      
      if(response.status=="200" || response.status=="201"){
        console.log(response);
        Cookies.set("authToken", response.data.token, { expires: 7 }); // Store token in cookies (expires in 7 days)
        showAlert("Logged In Successfully", "success");
        navigate("/");
      } else {
        
        showAlert("Invalid Credentials", "error");
      }
    } catch (error) {
      console.log(error);
      showAlert("Something went wrong!", "error");
    }
  };

  return (
    <div className="modal-container fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div
        className="modal bg-white w-96 rounded-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <button
            className="close-btn text-gray-800 hover:text-red-500"
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group mb-4">
            <input
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              autoComplete="current-email"
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            New to Zomato?{" "}
            <span
              className="text-red-500 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;