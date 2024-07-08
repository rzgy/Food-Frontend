import instance from "./index";
import { storeToken } from "./storage";

// User API
const fetchAllUsers = async () => {
  try {
    const { data } = await instance.get("/users");
    return data;
  } catch (error) {
    console.error("Failed to fetch users", error);
    throw error;
  }
};

const fetchOneUser = async () => {
  const token = localStorage.getItem("token");
  const { data } = await instance.get("/users/myprofile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const login = async (userInfo) => {
  const { data } = await instance.post("/users/signin", userInfo);
  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("/users/signup", formData);
  storeToken(data.token);
  return data;
};

const deleteUser = async (userId) => {
  try {
    const { data } = await instance.delete(`/user/${userId}`);
    return data;
  } catch (error) {
    console.error("Failed to delete user", error);
    throw error;
  }
};

const updateUser = async (userInfo) => {
  const token = localStorage.getItem("token");

  const { data } = await instance.put("/users/myprofile", userInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

// Recipe API
const fetchAllRecipes = async () => {
  try {
    const { data } = await instance.get("/recipe");
    return data;
  } catch (error) {
    console.error("Failed to fetch recipes", error);
    throw error;
  }
};

const fetchOneRecipe = async (recipeId) => {
  try {
    const { data } = await instance.get(`/recipe/${recipeId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch recipe", error);
    throw error;
  }
};

const createRecipe = async (recipeInfo) => {
  try {
    const { data } = await instance.post("/recipe", recipeInfo);
    return data;
  } catch (error) {
    console.error("Failed to create recipe", error);
    throw error;
  }
};

const updateRecipe = async (recipeId, recipeInfo) => {
  try {
    const { data } = await instance.put(`/recipe/${recipeId}`, recipeInfo);
    return data;
  } catch (error) {
    console.error("Failed to update recipe", error);
    throw error;
  }
};

const deleteRecipe = async (recipeId) => {
  try {
    const { data } = await instance.delete(`/recipe/${recipeId}`);
    return data;
  } catch (error) {
    console.error("Failed to delete recipe", error);
    throw error;
  }
};

const getRecipesByCategory = async (categoryId) => {
  try {
    const { data } = await instance.get(`/recipe/bycategory/${categoryId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch recipes by category", error);
    throw error;
  }
};

const getRecipesByUser = async (userId) => {
  try {
    const { data } = await instance.get(`/recipe/byuser/${userId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch recipes by user", error);
    throw error;
  }
};

const getRecipesByIngredient = async (ingredientId) => {
  try {
    const { data } = await instance.get(`/recipe/byingredient/${ingredientId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch recipes by ingredient", error);
    throw error;
  }
};

// Category API
const fetchAllCategories = async () => {
  try {
    const { data } = await instance.get("/category");
    return data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};

const fetchOneCategory = async (categoryId) => {
  try {
    const { data } = await instance.get(`/category/${categoryId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch category", error);
    throw error;
  }
};

const createCategory = async (categoryInfo) => {
  try {
    const { data } = await instance.post("/category", categoryInfo);
    return data;
  } catch (error) {
    console.error("Failed to create category", error);
    throw error;
  }
};

const updateCategory = async (categoryId, categoryInfo) => {
  try {
    const { data } = await instance.put(
      `/category/${categoryId}`,
      categoryInfo
    );
    return data;
  } catch (error) {
    console.error("Failed to update category", error);
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const { data } = await instance.delete(`/category/${categoryId}`);
    return data;
  } catch (error) {
    console.error("Failed to delete category", error);
    throw error;
  }
};

// Ingredient API
const fetchAllIngredients = async () => {
  try {
    const { data } = await instance.get("/ingredient");
    return data;
  } catch (error) {
    console.error("Failed to fetch ingredients", error);
    throw error;
  }
};

const fetchOneIngredient = async (ingredientId) => {
  try {
    const { data } = await instance.get(`/ingredient/${ingredientId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch ingredient", error);
    throw error;
  }
};

const createIngredient = async (ingredientInfo) => {
  try {
    const { data } = await instance.post("/ingredient", ingredientInfo);
    return data;
  } catch (error) {
    console.error("Failed to create ingredient", error);
    throw error;
  }
};

const updateIngredient = async (ingredientId, ingredientInfo) => {
  try {
    const { data } = await instance.put(
      `/ingredient/${ingredientId}`,
      ingredientInfo
    );
    return data;
  } catch (error) {
    console.error("Failed to update ingredient", error);
    throw error;
  }
};

const deleteIngredient = async (ingredientId) => {
  try {
    const { data } = await instance.delete(`/ingredient/${ingredientId}`);
    return data;
  } catch (error) {
    console.error("Failed to delete ingredient", error);
    throw error;
  }
};

export {
  fetchAllUsers,
  fetchOneUser,
  register,
  login,
  deleteUser,
  updateUser,
  fetchAllRecipes,
  fetchOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByCategory,
  getRecipesByUser,
  getRecipesByIngredient,
  fetchAllCategories,
  fetchOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchAllIngredients,
  fetchOneIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
