import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  setCredentials,
  logout,
} from "../services/authSlice";
import { useGetProfileQuery } from "../services/authApi";
import { useGetRecipesQuery } from "../services/recipeApi";
import { optimizeImage } from "../utils/cloudinary";
import RecipeCard from "../components/RecipeCard";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetProfileQuery();
  const { data: recipesData } = useGetRecipesQuery();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editFormData, setEditFormData] = useState({
    bio: "",
    age: "",
    dateOfBirth: "",
    phone: "",
    location: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (profileData) {
      setProfile(profileData);
      setEditFormData({
        bio: profileData.bio || "",
        age: profileData.age || "",
        dateOfBirth: profileData.dateOfBirth
          ? profileData.dateOfBirth.split("T")[0]
          : "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        facebook: profileData.socialMediaLinks?.facebook || "",
        instagram: profileData.socialMediaLinks?.instagram || "",
        twitter: profileData.socialMediaLinks?.twitter || "",
        linkedin: profileData.socialMediaLinks?.linkedin || "",
      });
    }

    if (profileError) {
      setError(profileError.data?.message || "Failed to load profile");
    }

    if (recipesData && user) {
      const allRecipes = recipesData.recipes || [];
      const userRecipes = allRecipes.filter(
        (recipe) =>
          recipe.userId?._id === user._id || recipe.userId === user._id,
      );
      setMyRecipes(userRecipes);
    }
  }, [profileData, recipesData, user, profileError, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.keys(editFormData).forEach((key) => {
        if (editFormData[key]) {
          formDataToSend.append(key, editFormData[key]);
        }
      });

      // Append file if selected
      if (fileInputRef.current?.files[0]) {
        formDataToSend.append("profilePicture", fileInputRef.current.files[0]);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.token || localStorage.getItem("token")}`,
          },
          body: formDataToSend,
        },
      );

      const data = await response.json();

      if (data.success) {
        setProfile(data.user);
        setPreviewImage(null);
        setEditMode(false);
        // Update Redux store
        dispatch(
          setCredentials({
            user: data.user,
            token: localStorage.getItem("token"),
          }),
        );
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  // Handle logout
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded-md">
            Profile not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="md:flex items-start justify-between">
            <div className="flex items-start gap-6 flex-1 mb-6 md:mb-0">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white text-6xl overflow-hidden flex-shrink-0 shadow-lg border-4 border-white dark:border-gray-700">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : profile.profilePicture ? (
                    <img
                      src={optimizeImage(profile.profilePicture, 200)}
                      alt={profile.username}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {profile.username}
                </h1>
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                  {profile.email}
                </p>

                {profile.location && (
                  <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-2">
                    📍 {profile.location}
                  </p>
                )}

                {profile.bio && (
                  <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {profile.age && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                    Age: {profile.age} years old
                  </p>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Member since{" "}
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                {/* Social Media Links */}
                {(profile.socialMediaLinks?.facebook ||
                  profile.socialMediaLinks?.instagram ||
                  profile.socialMediaLinks?.twitter ||
                  profile.socialMediaLinks?.linkedin) && (
                  <div className="flex gap-3 mt-4">
                    {profile.socialMediaLinks?.facebook && (
                      <a
                        href={profile.socialMediaLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        title="Facebook"
                      >
                        f
                      </a>
                    )}
                    {profile.socialMediaLinks?.instagram && (
                      <a
                        href={profile.socialMediaLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full hover:opacity-90 transition-opacity"
                        title="Instagram"
                      >
                        📷
                      </a>
                    )}
                    {profile.socialMediaLinks?.twitter && (
                      <a
                        href={profile.socialMediaLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                        title="Twitter"
                      >
                        𝕏
                      </a>
                    )}
                    {profile.socialMediaLinks?.linkedin && (
                      <a
                        href={profile.socialMediaLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                        title="LinkedIn"
                      >
                        in
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                  >
                    ✏️ Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setPreviewImage(null);
                    }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={editLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors disabled:opacity-50"
                  >
                    {editLoading ? "Saving..." : "Save"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Edit Form */}
          {editMode && (
            <div className="mt-8 border-t-2 border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Edit Profile
              </h3>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {/* Profile Picture Upload */}
                <div className="flex justify-center">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl text-white mb-2">📷</div>
                        <p className="text-white text-xs font-semibold">
                          Click to change
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={editFormData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>

                {/* Age and DOB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={editFormData.age}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editFormData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Phone and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Social Media Links
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Facebook
                      </label>
                      <input
                        type="url"
                        name="facebook"
                        value={editFormData.facebook}
                        onChange={handleInputChange}
                        placeholder="https://facebook.com/username"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Instagram
                      </label>
                      <input
                        type="url"
                        name="instagram"
                        value={editFormData.instagram}
                        onChange={handleInputChange}
                        placeholder="https://instagram.com/username"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Twitter
                      </label>
                      <input
                        type="url"
                        name="twitter"
                        value={editFormData.twitter}
                        onChange={handleInputChange}
                        placeholder="https://twitter.com/username"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={editFormData.linkedin}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* My Recipes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            🍳 My Recipes ({myRecipes.length})
          </h2>

          {myRecipes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 dark:text-gray-400 text-xl mb-6">
                You haven't created any recipes yet. Let's share your culinary
                creations!
              </p>
              <button
                onClick={() => navigate("/create")}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-lg transition-colors"
              >
                Create Your First Recipe ✨
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
