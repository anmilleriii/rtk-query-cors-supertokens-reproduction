import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import supertokens from "supertokens-website";

const BASE_URL = "http://localhost:3567/api/";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers) => {
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    signIn: builder.mutation<unknown, any>({
      query: ({ email, password }) => ({
        url: `signin`,
        method: "POST",
        body: {
          formFields: [
            {
              id: "email",
              value: email,
            },
            {
              id: "password",
              value: password,
            },
          ],
        },
      }),
    }),
    signUp: builder.mutation<unknown, any>({
      query: ({ email, password }) => ({
        url: `signup`,
        method: "POST",
        body: {
          formFields: [
            {
              id: "email",
              value: email,
            },
            {
              id: "password",
              value: password,
            },
          ],
        },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
