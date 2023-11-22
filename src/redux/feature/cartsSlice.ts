import { appConfig } from "@/constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCarts = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.appApiUrl}`,
  }),
  tagTypes: ["Carts"],
  reducerPath: "apiCarts",
  endpoints: (builder) => ({
    getCartsApi: builder.query({
      query: () => `Carts`.toLowerCase(),
      providesTags: ["Carts"],
    }),
    getByidCartsApi: builder.query({
      query: (id) => `Carts/${id}`.toLowerCase(),
      providesTags: ["Carts"],
    }),
    getByUserIdCartsApi: builder.query({
      query: (ide) => `Carts/user/${ide}`.toLowerCase(),

      providesTags: ["Carts"],
    }),

    deleteCarts: builder.mutation({
      query: (id) => ({
        url: `Carts/${id}`.toLowerCase(),
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Carts"],
    }),

    postCarts: builder.mutation({
      query: (payload) => ({
        url: `Carts`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useGetCartsApiQuery,
  usePostCartsMutation,
  useGetByidCartsApiQuery,
  useGetByUserIdCartsApiQuery,
  useDeleteCartsMutation,
} = apiCarts;
