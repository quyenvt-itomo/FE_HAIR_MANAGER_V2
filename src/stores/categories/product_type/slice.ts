import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { PRODUCT_TYPE_MESSAGES } from "../../../constants/message/categories/product_type";
import {
  ProductTypeData,
  ProductTypeQuery,
  ProductTypeResponse,
} from "../../../models/categories/attribute";

const initialState = createBaseInitialState<ProductTypeData>();

const productTypeSlice = createSlice({
  name: "product_type",
  initialState,
  reducers: {
    ...createBaseReducers<ProductTypeData, ProductTypeQuery, ProductTypeResponse>(
      PRODUCT_TYPE_MESSAGES
    ),
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
} = productTypeSlice.actions;

export default productTypeSlice.reducer;
