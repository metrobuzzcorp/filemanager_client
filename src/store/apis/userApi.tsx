import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginUserRequest,
  RegisterUserRequest,
  LoginUserResponse,
  RegisterUserResponse,
} from "@/types";
import { config } from "@/config";
import { endpointBuilder } from "@/utils";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (registrationData) => ({
        url: endpointBuilder([
          config.routes.user.prefix().path,
          config.routes.user.register().path,
        ]),
        method: config.routes.user.register().method,
        body: registrationData,
      }),
    }),
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (loginData) => ({
        url: endpointBuilder([
          config.routes.user.prefix().path,
          config.routes.user.login().path,
        ]),
        method: config.routes.user.login().method,
        body: loginData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  reducerPath: userApiReducerPath,
  middleware: userApiMiddleware,
  reducer: userApiReducer,
} = userApi;
