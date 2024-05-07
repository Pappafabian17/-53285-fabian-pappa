import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDatabase";

export const carsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCarsByCategoryQuery,
  useGetCarByIdQuery,
} = carsApi;
