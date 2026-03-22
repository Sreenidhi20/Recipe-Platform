import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    prepTime: "",
    difficulty: "Easy",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");

  // Update form field
  function updateField(fieldName, value) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  // Add ingredient
  function addIngredient() {
    if (ingredientInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }));
      setIngredientInput("");
    }
  }

  // Remove ingredient
  function removeIngredient(index) {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  }

  // Handle image change
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  // Validation
  function validateForm() {
    if (!formData.title.trim()) {
      setError("Title is required.");
      return false;
    }
    if (!formData.category.trim()) {
      setError("Category is required.");
      return false;
    }
    if (!formData.difficulty) {
      setError("Difficulty is required.");
      return false;
    }
    if (!formData.prepTime || parseInt(formData.prepTime) <= 0) {
      setError("Prep time must be a valid number greater than 0.");
      return false;
    }
    if (formData.ingredients.length === 0) {
      setError("Add at least one ingredient.");
      return false;
    }
    if (!formData.instructions.trim()) {
      setError("Instructions are required.");
      return false;
    }
    return true;
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData
      const data = new FormData();
      data.append("title", formData.title);
      data.append("instructions", formData.instructions);
      data.append("prepTime", formData.prepTime);
      data.append("difficulty", formData.difficulty);
      data.append("category", formData.category);

      // Append ingredients
      formData.ingredients.forEach((ing) => data.append("ingredients[]", ing));

      // Append image if present
      if (image) {
        data.append("image", image);
      }

      // API call with FormData
      const response = await API.post("/api/recipes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Recipe created successfully!");
      setTimeout(() => navigate(`/recipe/${response.data._id}`), 1000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to create recipe.");
      } else if (err.request) {
        setError("Server not responding. Please try again later.");
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Create Recipe
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Recipe Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter recipe title"
            />
          </div>

          {/* Category & Difficulty - Side by side */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => updateField("difficulty", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Prep Time */}
          <div>
            <label
              htmlFor="prepTime"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Prep Time (minutes)
            </label>
            <input
              id="prepTime"
              type="number"
              value={formData.prepTime}
              onChange={(e) => updateField("prepTime", e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="30"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipe Image
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
              />
              {imagePreview && (
                <div className="w-24 h-24 rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ingredients
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addIngredient();
                  }
                }}
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Add ingredient (press Enter)"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium"
              >
                Add
              </button>
            </div>

            {/* Ingredients List */}
            {formData.ingredients.length > 0 && (
              <div className="space-y-2">
                {formData.ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md"
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {ing}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => updateField("instructions", e.target.value)}
              rows="6"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Write step-by-step instructions..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Creating Recipe..." : "Create Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
}
