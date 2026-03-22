const express = require("express");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createRecipe,
  getAllRecipes,
  getRecipe,
  searchRecipes,
  likeRecipe,
  addComment,
} = require("../controllers/recipeController");

const router = express.Router();

// GET all recipes
router.get("/", getAllRecipes);

// GET search recipes (MUST be BEFORE /:id to avoid matching :id)
router.get("/search", searchRecipes);

// GET single recipe by ID
router.get("/:id", getRecipe);

// POST create recipe (protected + upload)
router.post("/", authMiddleware, upload.single("image"), createRecipe);

// PUT like recipe (protected)
router.put("/:id/like", authMiddleware, likeRecipe);

// POST add comment (protected)
router.post("/:id/comment", authMiddleware, addComment);

module.exports = router;
