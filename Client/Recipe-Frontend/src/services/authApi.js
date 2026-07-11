/*
endpoints:

login
register
getProfile
logout
*/
import { apiSlice } from "./api";
import { setCredentials, logout } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              user: data.user,
              token: data.token,
            }),
          );
        } catch (err) {}
      },
    }),

    getProfile: builder.query({
      query: () => "/api/auth/profile",
      providesTags: ["Profile"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetProfileQuery } =
  authApi;
