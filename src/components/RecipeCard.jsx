import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = recipe.strInstructions;
  if (!showFullDescription && description) {
    description = description.substring(0, 100) + "...";
  }

  // Load saved recipes from localStorage on mount
  useEffect(() => {
    const storedRecipes =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(storedRecipes);
  }, []);

  const toggleSaveRecipe = (recipe) => {
    let updatedRecipes;
    if (savedRecipes.some((fav) => fav.idMeal === recipe.idMeal)) {
      //remove
      updatedRecipes = savedRecipes.filter(
        (fav) => fav.idMeal !== recipe.idMeal,
      );
    } else {
      updatedRecipes = [...savedRecipes, recipe];
    }
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  const isFavorite = savedRecipes.some((fav) => fav.idMeal === recipe.idMeal);

  return (
    <article className="group cursor-pointer">
      <div className="relative mb-4">
        <div className="aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={1024}
            height={1024}
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

        <p className="max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
          {description}
          <span
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-sm ml-1 text-primary cursor-pointer"
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </span>
        </p>
      </div>
    </article>
  );
};

export default RecipeCard;
