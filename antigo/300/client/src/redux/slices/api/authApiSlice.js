import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Replace 'http://localhost:8800/api' with your actual backend URL
const API_URI = "http://localhost:8800/api";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
