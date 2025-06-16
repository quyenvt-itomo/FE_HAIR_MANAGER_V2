import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { PRODUCT_GROUP_MESSAGES } from "../../../constants/message/categories/product_group";
import {
  ProductGroupData,
  ProductGroupQuery,
  ProductGroupResponse,
} from "../../../models/categories/product_group";

const initialState = createBaseInitialState<ProductGroupData>();

const productGroupSlice = createSlice({
  name: "product_group",
  initialState,
  reducers: {
    ...createBaseReducers<ProductGroupData, ProductGroupQuery, ProductGroupResponse>(PRODUCT_GROUP_MESSAGES),
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
} = productGroupSlice.actions;

export default productGroupSlice.reducer;
