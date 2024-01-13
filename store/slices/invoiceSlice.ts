import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import * as serverService from "@/services/product.services";
import { RootState, store } from "../store";
import { NextRouter } from "next/router";
import { ProductItemData } from "@/models/invoice.model";

type ProductItemState = {
    items: ProductItemData[];
}

const initialState: ProductItemState = {
    items: []
}


export const getProducts = createAsyncThunk(
    "product/get",
    async () => {
        return await serverService.getProducts();
    }
);

const productSlice = createSlice({
    name: "invoice",
    initialState: initialState,
    reducers: {}, extraReducers: (builder: any) => {
        builder.addCase(getProducts.fulfilled, (state: any, action: any) => {
            state.products = action.payload;
        });
    },
});

// export common user selector
export const productSelector = (store: RootState): ProductItemData[] | undefined => store.product.products.map((product) => ({ ...product, qty: 1 }));

// export reducer
export default productSlice.reducer;