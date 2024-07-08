import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bigPicture from "../Pics/pngtree-cartoon-cookies-png-image_6516299.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#252526] text-white font-serif">
      <main className="w-full max-w-7xl text-center flex flex-col justify-start items-center mt-0 pt-4">
        <h1 className="text-5xl font-bold mb-5 text-white">
          Welcome to Foodex
        </h1>
        <p className="text-2xl mb-5 text-white">
          Explore Categories and Ingredients in the world of recipes.
        </p>
        <div className="relative w-full max-w-4xl mb-0">
          <img
            src={bigPicture}
            alt="Delicious Food"
            className="w-full max-h-80 object-contain mx-auto rounded-lg"
          />
        </div>
        <section className="w-full py-10 bg-orange-100 rounded-lg mt-5 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-7xl mx-auto">
            <h2 className="text-3xl mb-5 text-[#252526]">
              Enjoy Your Cooking Journey{" "}
            </h2>
            <p className="text-xl mb-5 text-[#252526]">
              Browse through a wide range of recipe categories and ingredients.
              Whether you're looking for breakfast ideas, dinner options, or
              dessert recipes, Foodex has it all. Easily find recipes based on
              the ingredients you have on hand and discover new and exciting
              dishes to try.
            </p>
          </div>
        </section>
      </main>

      <footer className="text-center text-gray-400 text-sm mt-2 py-4">
        © 2024 Foodex. All rights reserved.
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Home;
