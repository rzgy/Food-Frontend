import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { removeToken } from "../api/storage";
import { fetchOneUser } from "../api/auth";
import logo from "../Pics/pngwing.com.png";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const data = await fetchOneUser();
          setProfilePic(`http://localhost:8000/${data?.image}`);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  const handleLogout = () => {
    removeToken();
    setUser(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#252526] text-white shadow-md py-4 mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </Link>
            <Link to="/" className="ml-4 text-white text-3xl font-serif">
              Foodex
            </Link>
          </div>
          {user && (
            <div className="flex-grow flex justify-center">
              <div className="flex items-baseline space-x-4">
                <NavLink
                  to="/main"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Main
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Recipes
                </NavLink>
                <NavLink
                  to="/chefs"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  All Chefs
                </NavLink>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {profilePic && (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                      : "text-white hover:bg-orange-500 px-3 py-2 rounded-md text-lg font-medium"
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
