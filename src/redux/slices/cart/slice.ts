import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//actions
import { getCartAsync, updateCartAsync } from "./asyncActions";

//types
import { ICartInitialState, TCartItem } from "./types";
import { Status } from "@/@types/base";
import { TGetUpdateCartData } from "@/@types/products";
import { TProductPrice } from "../products/types";

const initialState: ICartInitialState = {
  items: [],
  isCartLoaded: false,
  count: 0,
  total: 0,
  status: Status.LOADING,
};

const getPriceForAmount = (prices: TProductPrice[], amount: number) => {
  const exactMatch = prices.find((price) => Number(price.amount) === amount);
  if (exactMatch) {
    return exactMatch.price;
  }
  const defaultPrice = prices.find((price) => price.amount === "1");
  return defaultPrice ? defaultPrice.price : 0;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.count = 0;
      state.total = 0;
      state.status = Status.LOADING;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getCartAsync.fulfilled, (state, action: PayloadAction<TCartItem[]>) => {
        state.items = action.payload;
        state.count = state.items.length;

        state.total = state.items.reduce((acc, item) => {
          const itemPrice = getPriceForAmount(item.product.prices, item.amount);
          return acc + item.amount * itemPrice;
        }, 0);

        state.isCartLoaded = true;
        state.status = Status.SUCCESS;
      })
      .addCase(getCartAsync.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
        state.count = 0;
        state.total = 0;
      })
      .addCase(
        updateCartAsync.fulfilled,
        (state, action: PayloadAction<TGetUpdateCartData | undefined>) => {
          if (!action.payload) return;

          const { product_id, amount, operation, inCart } = action.payload;
          const itemIndex = state.items.findIndex((i) => i.product.id === product_id);

          if (itemIndex !== -1) {
            const item = state.items[itemIndex];

            switch (operation) {
              case "+":
                item.amount += amount;
                break;
              case "-":
                item.amount = Math.max(0, item.amount - amount);
                break;
              case "=":
                item.amount = amount;
                break;
            }

            if (item.amount === 0) {
              state.items.splice(itemIndex, 1);
            }
          }

          state.count = inCart;

          state.total = state?.items.reduce((acc, i) => {
            const applicablePrice = i?.product.prices?.find((price) => {
              const nextAmount = i.product.prices[i.product.prices.indexOf(price) + 1]?.amount;
              return (
                i.amount >= parseInt(price.amount) &&
                (!nextAmount || i.amount < parseInt(nextAmount))
              );
            });
            const itemTotal = i.amount * (applicablePrice ? Number(applicablePrice.price) : 0);
            return acc + itemTotal;
          }, 0);
        }
      );
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
