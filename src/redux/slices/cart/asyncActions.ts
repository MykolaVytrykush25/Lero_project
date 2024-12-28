import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

//API
import { updateCart, getCartProducts } from "@/API/productsService";

//types
import { TUpdateCartData } from "@/@types/products";

//selectors
import { userSelector } from "../user/selectors";

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (body: TUpdateCartData, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const user = userSelector(state);

    try {
      const data = await updateCart(body);
      if (!user.isAuthenticated) {
        window.location.reload();
        return;
      }
      return { inCart: data.in_cart, ...body };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

export const getCartAsync = createAsyncThunk("cart/getCart", async () => {
  try {
    const data = await getCartProducts();
    return data;
  } catch (err) {
    throw err;
  }
});
