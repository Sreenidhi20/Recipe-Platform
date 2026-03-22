import { useEffect, useState } from "react";
import API from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all recipes on page load
  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/api/recipes");
      if (response.status === 200) {
        setRecipes(response.data.recipes || []);
        setFilteredRecipes(response.data.recipes || []);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to fetch recipes");
      } else if (err.request) {
        setError("Server not responding. Please try again later.");
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle search filter
  function handleSearch(query) {
    if (!query.trim()) {
      setFilteredRecipes(recipes);
      return;
    }
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading recipes...
              </p>
            </div>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {recipes.length === 0
                  ? "No recipes found. Be the first to create one!"
                  : "No recipes match your search."}
              </p>
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
