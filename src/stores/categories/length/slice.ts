import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { LENGTH_MESSAGES } from "../../../constants/message/categories/length";
import {
  LengthData,
  LengthQuery,
  LengthResponse,
} from "../../../models/categories/attribute";

const initialState = createBaseInitialState<LengthData>();

const lengthSlice = createSlice({
  name: "length",
  initialState,
  reducers: {
    ...createBaseReducers<LengthData, LengthQuery, LengthResponse>(
      LENGTH_MESSAGES
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
} = lengthSlice.actions;

export default lengthSlice.reducer;
