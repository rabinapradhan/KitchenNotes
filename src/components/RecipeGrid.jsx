import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipeGrid = ({ recipes }) => {
  const [sortBy, setSortBy] = useState("newest");

  // Apply sorting logic based on sortBy
  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortBy === "name") {
      return a.strMeal.localeCompare(b.strMeal); // alphabetical
    }
    if (sortBy === "newest") {
      return b.idMeal - a.idMeal;
    }
    return 0;
  });
  console.log(sortedRecipes);
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-medium text-muted-foreground">
          Showing {sortedRecipes.length} recipes
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by: </span>
          <select
            name="sortby"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-full bg-muted py-1.5 pl-4 pr-9 text-sm font-medium text-foreground ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="newest">Newest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedRecipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default RecipeGrid;
