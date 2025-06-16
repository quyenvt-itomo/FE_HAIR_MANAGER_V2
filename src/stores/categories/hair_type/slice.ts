import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { HAIR_TYPE_MESSAGES } from "../../../constants/message/categories/hair_type";
import {
  HairTypeData,
  HairTypeQuery,
  HairTypeResponse,
} from "../../../models/categories/attribute";

const initialState = createBaseInitialState<HairTypeData>();

const hairTypeSlice = createSlice({
  name: "hair_type",
  initialState,
  reducers: {
    ...createBaseReducers<HairTypeData, HairTypeQuery, HairTypeResponse>(
      HAIR_TYPE_MESSAGES
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
} = hairTypeSlice.actions;

export default hairTypeSlice.reducer;
