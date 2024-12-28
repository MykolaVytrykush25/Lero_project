import { createAsyncThunk } from "@reduxjs/toolkit";

//API
import { getProducts } from "@/API/productsService";

//types
import { TGetProductsParams } from "@/@types/products";


export const getProductsAsync = createAsyncThunk(
    "products/getProducts",
    async (body: TGetProductsParams, { rejectWithValue }) => {
        try {
            const data = await getProducts(body);
            return data;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);