import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories, fetchAllRecipes } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Recipes = () => {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  const {
    data: recipes,
    error: recipesError,
    isLoading: recipesLoading,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes,
  });

  const navigate = useNavigate();

  if (categoriesLoading || recipesLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || recipesError) {
    return <div>Error loading categories or recipes</div>;
  }

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <h3 className="text-3xl font-bold mb-6 text-center">Recipes</h3>
        <Link
          to="/add-recipe"
          className="bg-orange-500 text-white p-2 rounded mb-8 block text-center"
        >
          Add Recipe
        </Link>
        {categories.map((category) => (
          <div key={category._id} className="mb-12 p-4 rounded">
            <h4 className="text-2xl font-bold mb-4 text-orange-500">
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-6">
              {recipes
                .filter((recipe) => recipe.category === category._id)
                .map((recipe) => (
                  <div
                    key={recipe._id}
                    className="bg-white text-black p-4 rounded-lg shadow-md w-60 h-60 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                  >
                    <img
                      src={`http://localhost:8000/${recipe.image}`}
                      alt={recipe.title}
                      className="w-full h-full rounded-lg object-cover mb-2"
                    />
                    <p className="text-lg font-medium text-center text-black">
                      {recipe.title}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
