import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOneRecipe } from "../api/auth";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const {
    data: recipe,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => fetchOneRecipe(recipeId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading recipe details</div>;
  }

  console.log("Recipe data:", recipe);

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif flex flex-col items-center">
      <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 mt-4">
        <h3 className="text-3xl font-bold mb-6 text-center">{recipe.title}</h3>
        <div className="w-[100%] h-[50%] flex justify-center items-center">
          <img
            src={`http://localhost:8000/${recipe.image}`}
            alt={recipe.title}
            className="object-contain mb-6 rounded"
          />
        </div>
        <h4 className="text-2xl font-bold mb-4">Ingredients</h4>
        <ul className="list-disc list-inside mb-6">
          {recipe.ingredient && recipe.ingredient.length > 0 ? (
            recipe.ingredient.map((ingredient) => (
              <li key={ingredient._id}>{ingredient.name}</li>
            ))
          ) : (
            <li>No ingredients listed</li>
          )}
        </ul>
        <h4 className="text-2xl font-bold mb-4">Instructions</h4>
        <p>
          {recipe.description ? recipe.description : "No instructions provided"}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetails;
