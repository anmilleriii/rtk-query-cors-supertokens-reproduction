import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
