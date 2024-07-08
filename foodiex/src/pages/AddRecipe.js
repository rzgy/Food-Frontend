import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllCategories,
  fetchAllIngredients,
  createRecipe,
  createIngredient,
} from "../api/auth";
import Select from "react-select/creatable";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });
  const { data: ingredients, isLoading: ingredientsLoading } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchAllIngredients,
  });

  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    ingredients: [],
    instructions: "",
    image: null,
  });

  const createRecipeMutation = useMutation({
    mutationFn: (newRecipe) => createRecipe(newRecipe),
    onSuccess: () => {
      queryClient.invalidateQueries("recipes");
      navigate("/recipes");
    },
  });

  const createIngredientMutation = useMutation({
    mutationFn: (newIngredient) => createIngredient(newIngredient),
    onSuccess: () => {
      queryClient.invalidateQueries("ingredients");
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setRecipe((prevState) => ({ ...prevState, image: files[0] }));
    } else {
      setRecipe((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSelectChange = (selected) => {
    setRecipe((prevState) => ({
      ...prevState,
      ingredients: selected ? selected.map((s) => s.value) : [],
    }));
  };

  const handleCreateIngredient = (inputValue) => {
    createIngredientMutation.mutate(
      { name: inputValue },
      {
        onSuccess: (data) => {
          setRecipe((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, data._id],
          }));
        },
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("category", recipe.category);
    formData.append("description", recipe.instructions);
    formData.append("image", recipe.image);
    recipe.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    createRecipeMutation.mutate(formData);
  };

  if (categoriesLoading || ingredientsLoading) {
    return <div>Loading...</div>;
  }

  const ingredientOptions = ingredients.map((ingredient) => ({
    label: ingredient.name,
    value: ingredient._id,
  }));

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif flex flex-col items-center">
      <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 mt-4">
        <h3 className="text-3xl font-bold mb-6 text-center">Add Recipe</h3>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <label className="block mb-2 text-orange-600">Recipe Title:</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded bg-[#252526] text-orange-600 placeholder-orange-600"
            placeholder="Enter the recipe title..."
            required
          />
          <label className="block mb-2 text-orange-600 mt-4">Category:</label>
          <select
            name="category"
            value={recipe.category}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded bg-[#252526] text-orange-600"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="block mb-2 text-orange-600 mt-4">
            Ingredients:
          </label>
          <Select
            isMulti
            options={ingredientOptions}
            onChange={handleSelectChange}
            onCreateOption={handleCreateIngredient}
            className="text-orange-600"
            placeholder="Select or create ingredients..."
          />
          <label className="block mb-2 text-orange-600 mt-4">
            Instructions:
          </label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded bg-[#252526] text-orange-600 placeholder-orange-600"
            rows="5"
            placeholder="Tell us how to cook it step by step..."
            required
          />
          <label className="block mb-2 text-orange-600 mt-4">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="block w-full mt-1 p-2 border rounded bg-[#252526] text-orange-600"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded mt-4"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
