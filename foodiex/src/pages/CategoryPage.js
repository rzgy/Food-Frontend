import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipesByCategory, fetchOneCategory } from "../api/auth";

const CategoryPage = () => {
  const { categoryId } = useParams();

  const {
    data: category,
    error: categoryError,
    isLoading: isCategoryLoading,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => fetchOneCategory(categoryId),
  });

  const {
    data: recipes,
    error: recipesError,
    isLoading: isRecipesLoading,
  } = useQuery({
    queryKey: ["recipesByCategory", categoryId],
    queryFn: () => getRecipesByCategory(categoryId),
  });

  if (isCategoryLoading || isRecipesLoading) {
    return <div>Loading...</div>;
  }

  if (categoryError || recipesError) {
    return <div>Error loading category or recipes</div>;
  }

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <h3 className="text-3xl font-bold mb-6 text-center">
          {category?.name} Recipes
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          {recipes?.length > 0 ? (
            recipes.map((recipe) => (
              <Link
                to={`/recipe/${recipe._id}`}
                key={recipe._id}
                className="flex flex-col items-center"
              >
                <div className="bg-white text-black p-4 rounded-lg shadow-md w-80 h-80 transform transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                  <img
                    src={`http://localhost:8000/${recipe.image}`}
                    alt={recipe.title}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                <p className="text-2xl font-medium text-white hover:text-orange-500 mt-2">
                  {recipe.title}
                </p>
              </Link>
            ))
          ) : (
            <p>No recipes found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
