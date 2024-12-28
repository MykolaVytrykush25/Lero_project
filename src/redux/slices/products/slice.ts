import { Status } from "@/@types/base";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//actions
import { getProductsAsync } from "./asyncActions";
import { IProductsInitialState, TProductsByCategory } from "./types";

const initialState: IProductsInitialState = {
    products: null,
    status: Status.LOADING
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getProductsAsync.fulfilled, (state, action: PayloadAction<TProductsByCategory>) => {
                state.products = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(getProductsAsync.rejected, (state) => {
                state.status = Status.ERROR;
            })
    },
})

export default productsSlice.reducer;