const Recipe = require("../models/Recipe");

// 1. Create Recipe - Protected Route
const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, prepTime, difficulty, category } =
      req.body;

    // Image URL from Cloudinary via Multer
    const image = req.file ? req.file.path : "";

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      prepTime,
      difficulty,
      category,
      image,
      userId: req.user.userId, // from auth middleware
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Get all recipes with pagination, sorting, and user info
const getAllRecipes = async (req, res) => {
  try {
    // Extract page and limit from query params, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // Fetch recipes, populate user info, sort newest first
    const recipes = await Recipe.find()
      .populate("userId", "username profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count of recipes
    const totalRecipes = await Recipe.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalRecipes / limit);

    // Return structured response
    res.json({
      recipes,
      totalPages,
      currentPage: page,
      totalRecipes,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Get single recipe by ID with populated user and comments

const getRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;

    // Find recipe by ID and populate both creator and commenters
    const recipe = await Recipe.findById(recipeId)
      .populate("userId", "username profilePicture") // recipe owner
      .populate("comments.userId", "username profilePicture"); // each commenter

    // If recipe not found, return 404
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Return recipe with populated fields
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//4. Search recipes by title or ingredients (case-insensitive)
const searchRecipes = async (req, res) => {
  try {
    // ✅ Fix
    const { q, category } = req.query;
    if (!q && !category) {
      return res
        .status(400)
        .json({ message: "Search term or category is required" });
    }
    const searchQuery = {};
    if (q) {
      searchQuery.$or = [
        { title: new RegExp(q, "i") },
        { ingredients: new RegExp(q, "i") },
      ];
    }
    if (category) {
      searchQuery.category = category;
    }
    const recipes = await Recipe.find(searchQuery).populate(
      "userId",
      "username profilePicture",
    );
    res.json(recipes);
  } catch (error) {
    console.error("Error searching recipes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 5. Like a recipe - Protected Route
const likeRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.userId;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (recipe.likes.includes(userId)) {
      // Unlike
      await Recipe.findByIdAndUpdate(
        recipeId,
        { $pull: { likes: userId } },
        { new: true },
      );
      return res.json({ message: "Recipe unliked", liked: false });
    } else {
      // Like
      await Recipe.findByIdAndUpdate(
        recipeId,
        { $push: { likes: userId } },
        { new: true },
      );
      return res.json({ message: "Recipe liked", liked: true });
    }
  } catch (error) {
    console.error("Error liking recipe:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//6. Add comment to a recipe - Protected Route
const addComment = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.userId;
    const { text } = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const comment = {
      userId,
      text,
    };

    recipe.comments.push(comment);
    await recipe.save();
    await recipe.populate("comments.userId", "username profilePicture");
    res.json({
      message: "Comment added successfully",
      comments: recipe.comments, // return updated comments
    });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  searchRecipes,
  likeRecipe,
  addComment,
};
