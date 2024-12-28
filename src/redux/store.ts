import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

//slices
import userSlice from "./slices/user/slice";
import cartSlice from "./slices/cart/slice";
import breadcrumbsSlice from "./slices/breadcrumbs/slice";
import productsSlice from './slices/products/slice'

export const store = configureStore({
  reducer: {
    userSlice,
    cartSlice,
    breadcrumbsSlice,
    productsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
