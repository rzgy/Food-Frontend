import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "../api/auth";
import { Link } from "react-router-dom";
import bigImage from "../Pics/Quick-and-Easy-Pepperoni-Pizza-700x700.jpeg";

const Main = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center mb-10 bg-orange-100 text-black p-6 rounded-lg shadow-md">
            <img
              src={bigImage}
              alt="Pepperoni Pizza"
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
            <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-left max-w-md">
              <p className="text-sm mb-2">85% would make this again</p>
              <h2 className="text-3xl font-bold mb-4">Pepperoni Pizza</h2>
              <p className="text-lg">
                Look no further for a classic pepperoni pizza recipe! No one can
                deny its simple yet delicious taste.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-3xl font-bold mb-6 text-center">Categories</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {categories.slice(0, 5).map((category) => (
              <Link
                to={`/category/${category._id}`}
                key={category._id}
                className="flex flex-col items-center"
              >
                <div className="bg-white text-black p-1 rounded-full shadow-md w-24 h-24 transform transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                  <img
                    src={`http://localhost:8000/${category.image}`}
                    alt={category.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium text-white hover:text-orange-500 mt-2">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
