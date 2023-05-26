import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './src/slices/apiSlice.js'
import authSlice from "./src/slices/authSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
