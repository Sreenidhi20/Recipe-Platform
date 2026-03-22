import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import RecipeCard from "../components/RecipeCard";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchProfileData();
  }, [user, navigate]);

  async function fetchProfileData() {
    try {
      setLoading(true);
      setError("");

      // Fetch user profile
      const profileResponse = await API.get("/api/auth/profile");
      
      // The response data is the profile object directly
      const profileData = profileResponse.data;
      
      if (profileData && profileData.username) {
        setProfile(profileData);
      } else {
        setError("Profile data not available");
        return;
      }

      // Fetch all recipes and filter by current user
      const recipesResponse = await API.get("/api/recipes");

      const allRecipes = recipesResponse.data.recipes || [];
      const userRecipes = allRecipes.filter(
        (recipe) =>
          recipe.userId?._id === user._id || recipe.userId === user._id,
      );
      setMyRecipes(userRecipes);
    } catch (err) {
      console.error("Profile fetch error:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to load profile");
      } else if (err.request) {
        setError("Server not responding. Please try again later.");
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle logout
  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded-md">
            Profile not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-4xl overflow-hidden flex-shrink-0">
                {profile.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt={profile.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>👤</span>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {profile.username}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {profile.email}
                </p>
                {profile.bio && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {profile.bio}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Member since{" "}
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* My Recipes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            My Recipes ({myRecipes.length})
          </h2>

          {myRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                You haven't created any recipes yet.
              </p>
              <button
                onClick={() => navigate("/create")}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
              >
                Create Your First Recipe
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRecipes.map((recipe) => (
                <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
