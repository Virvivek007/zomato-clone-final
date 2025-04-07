import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Signup = ({ showAlert }) => {
  const navigate = useNavigate();
  const VITE_URL = import.meta.env.VITE_URL;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    try {
      const response = await axios.post(`${VITE_URL}/auth/signup`, {
        name,
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      alert(response);
    }catch(err){
      console.log("Signup Error : "+err);
    }
  };

  return (
    <div className="modal-container fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div
        className="modal bg-white w-96 rounded-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sign up</h1>
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
              type="text"
              name="name"
              id="name"
              value={credentials.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              autoComplete="current-username"
            />
          </div>
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
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Create Account
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-red-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;