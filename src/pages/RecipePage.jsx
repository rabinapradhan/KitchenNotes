import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipePage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const storedRecipes =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(storedRecipes);
  }, []);

  const toggleSaveRecipe = (recipe) => {
    let updatedRecipes;
    if (savedRecipes.some((fav) => fav.idMeal === recipe.idMeal)) {
      updatedRecipes = savedRecipes.filter(
        (fav) => fav.idMeal !== recipe.idMeal,
      );
    } else {
      updatedRecipes = [...savedRecipes, recipe];
    }
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  const toggleDescription = (idMeal) => {
    setExpanded((prev) => ({ ...prev, [idMeal]: !prev[idMeal] }));
  };

  return (
    <div className="max-w-7xl px-6  mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Your Saved Recipes</h2>

      {savedRecipes.length === 0 ? (
        <p className="text-gray-500">No favorites yet. Add some recipes!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {savedRecipes.map((recipe) => {
            const isFavorite = savedRecipes.some(
              (fav) => fav.idMeal === recipe.idMeal,
            );
            const showFull = expanded[recipe.idMeal];

            return (
              <article key={recipe.idMeal} className="group cursor-pointer">
                <div className="relative mb-4">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <button
                    onClick={() => toggleSaveRecipe(recipe)}
                    className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm shadow-sm ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
                    aria-label="Add to favorites"
                  >
                    {isFavorite ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium leading-tight text-pretty text-foreground transition-colors group-hover:text-primary">
                    {recipe.strMeal}
                  </h3>

                  {recipe.strInstructions && (
                    <p className="max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
                      {showFull
                        ? recipe.strInstructions
                        : recipe.strInstructions.substring(0, 100) + "..."}
                      <span
                        onClick={() => toggleDescription(recipe.idMeal)}
                        className="text-sm ml-1 text-primary cursor-pointer"
                      >
                        {showFull ? "Show Less" : "Show More"}
                      </span>
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipePage;
