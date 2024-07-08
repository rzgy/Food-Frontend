import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../context/UserContext";
import { fetchAllUsers } from "../api/auth";
import chefHat from "../Pics/Chef_Hat_Clipart_Vector__Hat_Chef_Logo_And_Symbols_Vector_Template_Free_Logo_Design_Template__Chef_Hat_Clipart__Baker__Breakfast_PNG_Image_For_Free_Download-removebg-preview.png";

const Chefs = () => {
  const [user, setUser] = useContext(UserContext);
  const [query, setQuery] = useState("");

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  const handleSearch = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  const queryUsers = users
    ?.filter(
      (user, index, self) => self.findIndex((u) => u._id === user._id) === index
    )
    ?.filter((user) => user.username?.toLowerCase().includes(query))
    .reverse();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 mb-14">
        <h3 className="text-3xl font-bold mb-6 text-center">All Chefs</h3>
        <div className="relative flex gap-2 mb-12">
          <input
            type="search"
            className="form-input rounded w-full px-4 py-2 border border-orange-300 bg-[#252526] text-orange-600 placeholder-orange-600"
            placeholder="Search Chefs"
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {queryUsers?.map((user) => (
            <div
              key={user._id}
              className="flex flex-col items-center relative mb-12"
            >
              <div className="bg-white text-black p-4 rounded-full shadow-md w-40 h-40 flex items-center justify-center relative">
                <img
                  src={`http://localhost:8000/${user.image}`}
                  alt={user.username}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <img
                  src={chefHat}
                  alt="Chef Hat"
                  className="absolute top-[-75px] w-32 h-32"
                />
              </div>
              <p className="text-sm font-medium text-white mt-2">
                {user.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chefs;
