import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/api/authApiSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
  devTools: true,
});

export default store;
