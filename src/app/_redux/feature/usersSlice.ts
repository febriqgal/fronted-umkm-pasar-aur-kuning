import { appConfig } from "@/app/_constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiUsers = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.appApiUrl}`,
  }),
  tagTypes: ["Users"],
  reducerPath: "apiUsers",
  endpoints: (builder) => ({
    getUsersApi: builder.query({
      query: () => `Users`.toLowerCase(),
      providesTags: ["Users"],
    }),
    getUserByIdApi: builder.query({
      query: (id) => `Users/${id}`.toLowerCase(),
      providesTags: ["Users"],
    }),
    postUsers: builder.mutation({
      query: (payload) => ({
        url: `users`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Users"],
    }),
    updateUsers: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`.toLowerCase(),
        method: "PATCH",
        body: patch,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersApiQuery,
  usePostUsersMutation,
  useGetUserByIdApiQuery,
  useUpdateUsersMutation,
} = apiUsers;
