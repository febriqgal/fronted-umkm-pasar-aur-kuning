import { appConfig } from "@/constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCategory = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.appApiUrl}`,
  }),
  tagTypes: ["Category"],
  reducerPath: "apiCategory",
  endpoints: (builder) => ({
    getCategoryApi: builder.query({
      query: () => `Category`.toLowerCase(),
      providesTags: ["Category"],
    }),
    postCategory: builder.mutation({
      query: (payload) => ({
        url: `Category`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoryApiQuery, usePostCategoryMutation } = apiCategory;
