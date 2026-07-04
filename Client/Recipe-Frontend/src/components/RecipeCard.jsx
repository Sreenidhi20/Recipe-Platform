import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
    >
      {recipe.image && (
        <div className="h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow-lg">
            ❤️ {recipe.likes?.length || 0}
          </div>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 truncate hover:text-indigo-600 dark:hover:text-indigo-400">
          {recipe.title}
        </h3>

        <div className="flex items-center gap-2 mb-3 text-sm flex-wrap">
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-xs font-semibold">
            {recipe.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
            recipe.difficulty === "Easy" ? "bg-green-500"
            : recipe.difficulty === "Medium" ? "bg-yellow-500"
            : "bg-red-500"
          }`}>
            {recipe.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
          <span>⏱️</span>
          <span className="font-semibold">{recipe.prepTime} mins</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
            by <span className="font-bold text-indigo-600 dark:text-indigo-400">{recipe.userId?.username}</span>
          </span>
          <div className="text-xs bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 px-2 py-1 rounded">
            View →
          </div>
        </div>
      </div>
    </div>
  );
}