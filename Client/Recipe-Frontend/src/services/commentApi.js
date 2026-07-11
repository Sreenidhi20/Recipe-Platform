/*
    endpoints:
getComments
addComment
deleteComment
*/
import { apiSlice } from "./api";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ recipeId, text }) => ({
        url: `/api/recipes/${recipeId}/comment`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const { useAddCommentMutation } = commentApi;
