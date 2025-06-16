import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { CATEGORY_MESSAGES } from "../../../constants/message/categories/category";
import {
  CategoryData,
  CategoryQuery,
  CategoryResponse,
} from "../../../models/categories/attribute";

const initialState = createBaseInitialState<CategoryData>();

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    ...createBaseReducers<CategoryData, CategoryQuery, CategoryResponse>(
      CATEGORY_MESSAGES
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
} = categorySlice.actions;

export default categorySlice.reducer;
