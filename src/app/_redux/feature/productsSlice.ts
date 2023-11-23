import { appConfig } from "@/app/_constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiProducts = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.appApiUrl}`,
  }),
  tagTypes: ["Products"],
  reducerPath: "apiProducts",
  endpoints: (builder) => ({
    getProductsApi: builder.query({
      query: () => `Products`.toLowerCase(),
      providesTags: ["Products"],
    }),
    getByidProductsApi: builder.query({
      query: (id) => `Products/${id}`.toLowerCase(),
      providesTags: ["Products"],
    }),
    getByUserIdProductsApi: builder.query({
      query: (ide) => `Products/user/${ide}`.toLowerCase(),

      providesTags: ["Products"],
    }),

    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `Products/${id}`.toLowerCase(),
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Products"],
    }),

    postProducts: builder.mutation({
      query: (payload) => ({
        url: `Products`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsApiQuery,
  usePostProductsMutation,
  useGetByidProductsApiQuery,
  useGetByUserIdProductsApiQuery,
  useDeleteProductsMutation,
} = apiProducts;
