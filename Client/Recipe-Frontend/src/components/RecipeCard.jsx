import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {recipe.image && (
        <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate">
          {recipe.title}
        </h3>

        <div className="flex items-center gap-2 mb-2 text-sm">
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded">
            {recipe.category}
          </span>
          <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
            recipe.difficulty === "Easy" ? "bg-green-500"
            : recipe.difficulty === "Medium" ? "bg-yellow-500"
            : "bg-red-500"
          }`}>
            {recipe.difficulty}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          ⏱️ {recipe.prepTime} mins
        </p>

        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
            by <span className="font-medium">{recipe.userId?.username}</span>
          </span>
          <span className="text-sm font-medium text-red-500">
            ❤️ {recipe.likes?.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
}