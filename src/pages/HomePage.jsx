import React, { useEffect, useState } from "react";
import RecipeGrid from "../components/RecipeGrid";
import { IoSearch } from "react-icons/io5";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Recipes");
  const searchRecipes = async () => {
    const res =
      await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${query}
`);
    const data = await res.json();

    setRecipes(data.meals || []);
    console.log(data.meals);
  };

  //Fetch random recipes (e.g. 5 at once)
  const fetchRandomRecipes = async () => {
    const promises = Array.from({ length: 5 }, () =>
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) =>
        res.json(),
      ),
    );
    const results = await Promise.all(promises);
    console.log(results);
    const randomMeals = results.map((r) => r.meals[0]);
    console.log(randomMeals);
    setRecipes(randomMeals);
  };

  // Fetch by Category
  const fetchByCategory = async (category) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const data = await res.json();

    // Now fetch full details for each recipe ID
    const promises = (data.meals || []).map((meal) =>
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`,
      )
        .then((res) => res.json())
        .then((detail) => detail.meals[0]),
    );

    const fullRecipes = await Promise.all(promises);
    setRecipes(fullRecipes);
  };

  useEffect(() => {
    // Load random recipes on first mount
    fetchRandomRecipes();
  }, []);
  return (
    <section className="px-6  py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-medium leading-tight text-balance text-foreground md:text-5xl">
          What are we cooking today?
        </h1>
        <div className="relative mx-auto  flex items-center mt-8 max-w-xl">
          <input
            type="text"
            className="w-full flex-1 rounded-2xl bg-card py-4 pl-12 pr-4 text-base text-foreground shadow-sm ring-1 ring-black/5 placeholder:text-muted-foreground transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={query}
            placeholder="Search ingredients or cuisines..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="flex bg-primary text-sm rounded-r-2xl text-white absolute right-0.5 items-center gap-2 px-3 py-4 "
            onClick={searchRecipes}
          >
            <IoSearch size={20} />
            Search
          </button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            "All Recipes",
            "Vegetarian",
            "Breakfast",
            "Starter",
            "Seafood",
            "Dessert",
          ].map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category); // mark this as active
                if (category === "All Recipes") {
                  fetchRandomRecipes(); // show random recipes again
                } else {
                  fetchByCategory(category);
                }
              }}
              className={
                activeCategory === category
                  ? "rounded-full px-4 py-1.5 text-sm font-medium transition-colors bg-primary text-primary-foreground ring-1 ring-primary"
                  : "rounded-full px-4 py-1.5 text-sm font-medium transition-colors bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <RecipeGrid recipes={recipes} />
    </section>
  );
};

export default HomePage;
