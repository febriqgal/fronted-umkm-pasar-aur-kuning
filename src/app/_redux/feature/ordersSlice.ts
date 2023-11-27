import { appConfig } from "@/app/_constant/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiOrders = createApi({
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${appConfig.appApiUrl}`,
  }),
  tagTypes: ["Orders"],
  reducerPath: "apiOrders",
  endpoints: (builder) => ({
    getOrdersApi: builder.query({
      query: () => `Orders`.toLowerCase(),
      providesTags: ["Orders"],
    }),
    getByidOrdersApi: builder.query({
      query: (id) => `Orders/${id}`.toLowerCase(),
      providesTags: ["Orders"],
    }),
    getByStatusOrdersApi: builder.query({
      query: (id) => `Orders/status/${id}`.toLowerCase(),
      providesTags: ["Orders"],
    }),
    getByUserIdOrdersApi: builder.query({
      query: (ide) => `Orders/user/${ide}`.toLowerCase(),

      providesTags: ["Orders"],
    }),

    deleteOrders: builder.mutation({
      query: (id) => ({
        url: `Orders/${id}`.toLowerCase(),
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Orders"],
    }),

    postOrders: builder.mutation({
      query: (payload) => ({
        url: `Orders`.toLowerCase(),
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersApiQuery,
  useGetByStatusOrdersApiQuery,
  usePostOrdersMutation,
  useGetByidOrdersApiQuery,
  useGetByUserIdOrdersApiQuery,
  useDeleteOrdersMutation,
} = apiOrders;
