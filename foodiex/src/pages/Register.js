import React, { useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bigImage from "../Pics/Chef_Character_PNG_Image__Creative_Chef_Cartoon_Character_Pictures__Chef_Clipart__Cartoon_Clipart__Character_Clipart_PNG_Image_For_Free_Download-removebg-preview.png";
import { register } from "../api/auth";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
      navigate("/book-collection");
      toast.success("Registration successful!");
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Registration failed. Please check your details.");
      setIsLoading(false);
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    mutate();
  };

  const logout = () => {
    toast.info("Logging out...");
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#252526] text-white font-serif">
      <ToastContainer />
      <main className="flex flex-col items-center justify-center text-center p-6 w-full">
        <div className="flex items-center justify-center space-x-6 max-w-7xl w-full">
          <div className="w-1/2">
            <img src={bigImage} alt="Library" className="w-full h-auto" />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl mb-5 text-white">Register</h2>
            <p className="mb-5 text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 underline">
                Login here
              </Link>
            </p>
            <form onSubmit={handleFormSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-2 text-white text-left"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-500 rounded-md focus:outline-none focus:border-orange-500 bg-[#252526] text-orange-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-white text-left"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-500 rounded-md focus:outline-none focus:border-orange-500 bg-[#252526] text-orange-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-white text-left"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userInfo.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-500 rounded-md focus:outline-none focus:border-orange-500 bg-[#252526] text-orange-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="image"
                  className="block mb-2 text-white text-left"
                >
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none flex items-center justify-center"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4zm2 5.291A7.964 7.964 0 0112 20a8 8 0 010-16v8H6v5.291z"
                    ></path>
                  </svg>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <div className="text-center text-gray-400 text-sm mt-2 mb-4">
        © 2024 Foodex. All rights reserved.
      </div>
    </div>
  );
};

export default Register;
