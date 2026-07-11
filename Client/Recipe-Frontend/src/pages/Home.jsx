import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../services/authSlice";
import { useGetRecipesQuery } from "../services/recipeApi";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const user = useSelector(selectCurrentUser);
  const {
    data: recipesData,
    isLoading: loading,
    error: apiError,
  } = useGetRecipesQuery();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [error, setError] = useState("");

  // Fetch all recipes on page load
  useEffect(() => {
    if (apiError) {
      if (apiError.data?.message) {
        setError(apiError.data.message);
      } else {
        setError("Failed to fetch recipes");
      }
    } else if (recipesData) {
      const recipeList = recipesData.recipes || [];
      setRecipes(recipeList);
      setFilteredRecipes(recipeList);
      setError("");
    }
  }, [recipesData, apiError]);

  // Handle search filter
  function handleSearch(query) {
    if (!query.trim()) {
      setFilteredRecipes(recipes);
      return;
    }
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredRecipes(filtered);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">🍳 Welcome to RecipeShare</h1>
          <p className="text-xl mb-8 text-indigo-100">
            Discover, share, and celebrate recipes from around the world
          </p>
          {!user && (
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* SearchBar */}
      <SearchBar onSearch={handleSearch} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Recipes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredRecipes.length} recipe
                {filteredRecipes.length !== 1 ? "s" : ""} found
              </p>
            </div>
            {user && (
              <Link
                to="/create"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                + Add Recipe
              </Link>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading delicious recipes...
              </p>
            </div>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                {recipes.length === 0
                  ? "No recipes found. Be the first to create one!"
                  : "No recipes match your search."}
              </p>
              {user && recipes.length === 0 && (
                <Link
                  to="/create"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create First Recipe
                </Link>
              )}
              {recipes.length === 0 && !user && (
                <Link
                  to="/register"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Register to Create
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
