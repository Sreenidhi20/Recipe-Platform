import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Fetch recipe on page load
  useEffect(() => {
    fetchRecipe();
  }, [id]);

  async function fetchRecipe() {
    try {
      setLoading(true);
      setError("");
      const response = await API.get(`/api/recipes/${id}`);
      const recipeData = response.data; // response.data IS the recipe
      setRecipe(recipeData);
      setLikesCount(recipeData.likes?.length || 0);

      // Check if current user already liked
      if (user && recipeData.likes) {
        const alreadyLiked = recipeData.likes.some(
          (likeId) => likeId === user._id,
        );
        setLiked(alreadyLiked);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to fetch recipe");
      } else if (err.request) {
        setError("Server not responding. Please try again later.");
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Handle like
  async function handleLike() {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await API.put(`/api/recipes/${id}/like`);
      setLiked(response.data.liked);
      // Update count locally instead
      setLikesCount((prev) => (response.data.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Error liking recipe:", err);
    }
  }

  // Handle comment submit
  async function handleComment(e) {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    setCommentLoading(true);

    try {
      const response = await API.post(`/api/recipes/${id}/comment`, {
        text: commentText,
      });

      setRecipe((prev) => ({
        ...prev,
        comments: response.data.comments,
      }));
      setCommentText("");
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setCommentLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
            {error || "Recipe not found"}
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Recipe Image */}
      {recipe.image && (
        <div className="w-full h-96 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                {recipe.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  by{" "}
                  <span className="font-medium">{recipe.userId?.username}</span>
                </span>
                <span>•</span>
                <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded">
                  {recipe.category}
                </span>
                <span>•</span>
                <span
                  className={`px-2 py-1 rounded text-white text-xs font-medium ${
                    recipe.difficulty === "Easy"
                      ? "bg-green-500"
                      : recipe.difficulty === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                >
                  {recipe.difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={handleLike}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                liked
                  ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              ❤️ {likesCount}
            </button>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            ⏱️ {recipe.prepTime} mins
          </p>
        </div>

        {/* Ingredients Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300"
                >
                  <span className="mr-3 text-indigo-600 dark:text-indigo-400">
                    •
                  </span>
                  {ingredient}
                </li>
              ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Instructions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {recipe.instructions}
          </p>
        </div>

        {/* Comments Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Comments ({recipe.comments?.length || 0})
          </h2>

          {/* Comment Input */}
          {user ? (
            <form onSubmit={handleComment} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={commentLoading || !commentText.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium disabled:opacity-50"
                >
                  {commentLoading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 text-center rounded-md">
              <p className="text-gray-700 dark:text-gray-300">
                <button
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Login
                </button>{" "}
                to comment
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {recipe.comments && recipe.comments.length > 0 ? (
              recipe.comments.map((comment, index) => (
                <div
                  key={index}
                  className="border-l-4 border-indigo-600 dark:border-indigo-400 bg-gray-50 dark:bg-gray-700 p-4 rounded"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {comment.userId?.username || "Unknown User"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {comment.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
