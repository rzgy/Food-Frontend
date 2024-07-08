import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import { getToken } from "./api/storage";
import UserContext from "./context/UserContext";
import Main from "./pages/Main";
import CategoryPage from "./pages/CategoryPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";
import Categories from "./pages/Categories";
import Chefs from "./pages/Chefs";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDeatils";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (getToken()) setUser(true);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {user && (
          <>
            <Route path="/main" element={<Main />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chefs" element={<Chefs />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
