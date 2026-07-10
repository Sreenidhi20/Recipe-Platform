/**
 * endpoints:
getRecipes
getRecipeById
createRecipe
updateRecipe
deleteRecipe
searchRecipes
 */
import { apiSlice } from "./api";

export const recipeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: ({ page = 1, limit = 10 } = {}) =>
        `/api/recipes?page=${page}&limit=${limit}`,
      providesTags: ["Recipe"],
      keepUnusedDataFor: 300, // ← cache for 5 minutes instead of 60 seconds
    }),

    getRecipeById: builder.query({
      query: (id) => `/api/recipes/${id}`,
      providesTags: ["Recipe"],
      keepUnusedDataFor: 300, // ← cache for 5 minutes
    }),

    searchRecipes: builder.query({
      query: ({ q, category }) => {
        const params = new URLSearchParams();
        if (q) params.append("q", q);
        if (category) params.append("category", category);
        return `/api/recipes/search?${params}`;
      },
      providesTags: ["Recipe"],
    }),

    createRecipe: builder.mutation({
      query: (formData) => ({
        url: "/api/recipes",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Recipe"], // ← auto-refreshes recipe list!
    }),

    likeRecipe: builder.mutation({
      query: (id) => ({
        url: `/api/recipes/${id}/like`,
        method: "PUT",
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useSearchRecipesQuery,
  useCreateRecipeMutation,
  useLikeRecipeMutation,
} = recipeApi;
