import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import gif from "../Pics/DKke.gif";

const NotFoundPage = () => {
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#252526] text-white font-serif">
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <div className="flex items-center justify-center space-x-6 max-w-5xl w-full">
          <div className="w-1/2">
            <h1 className="text-6xl font-bold text-white mb-4">
              Oops! Page not found
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              It looks like you've taken a wrong turn. Don't worry, it happens
              to the best of us.
            </p>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-orange-500">
                Go back to Home
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <img src={gif} alt="404 Illustration" className="w-full h-auto" />
          </div>
        </div>
      </main>
      <div className="text-center text-gray-400 text-sm mt-2 mb-4">
        © 2024 Aya's Library. All rights reserved.
      </div>
    </div>
  );
};

export default NotFoundPage;
