import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { PRODUCT_MESSAGES } from "../../../constants/message/categories/product";
import {
  ProductData,
  ProductQuery,
  ProductResponse,
} from "../../../models/categories/product";

const initialState = createBaseInitialState<ProductData>();

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ...createBaseReducers<ProductData, ProductQuery, ProductResponse>(PRODUCT_MESSAGES),
  },
});

export const {
  getAll,
  getAllSuccess,
  getAllFailure,
  getItem,
  getItemSuccess,
  getItemFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  updateItem,
  updateItemSuccess,
  updateItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
  clearMessage,
  reset,
  resetErrors,
} = productSlice.actions;

export default productSlice.reducer;
