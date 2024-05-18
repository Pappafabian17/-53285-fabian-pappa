import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDatabase";

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["profileImageGet", "getOrders"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `brands.json`,
    }),
    getCarsByCategory: builder.query({
      query: (category) => `cars.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const responseTransformed = Object.values(response);
        return responseTransformed;
      },
    }),
    getCarById: builder.query({
      query: (productId) => `cars.json?orderBy="id"&equalTo=${productId}`,
      transformResponse: (response) => {
        const responseTransformed = Object.values(response);
        if (responseTransformed.length) return responseTransformed[0];
        return responseTransformed;
      },
    }),
    postOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: "orders.json",
        method: "POST",
        body: order,
      }),
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    getOrders: builder.query({
      query: () => `orders.json`,
      providesTags: ["getOrders"],
    }),

    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCarsByCategoryQuery,
  useGetCarByIdQuery,
  usePostOrderMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation,
  useGetOrdersQuery,
} = carsApi;
