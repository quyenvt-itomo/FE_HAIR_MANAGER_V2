import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { HAIR_QUALITY_MESSAGES } from "../../../constants/message/categories/hair_quality";
import {
  HairQualityData,
  HairQualityQuery,
  HairQualityResponse,
} from "../../../models/categories/attribute";

const initialState = createBaseInitialState<HairQualityData>();

const hairQualitySlice = createSlice({
  name: "hair_quality",
  initialState,
  reducers: {
    ...createBaseReducers<
      HairQualityData,
      HairQualityQuery,
      HairQualityResponse
    >(HAIR_QUALITY_MESSAGES),
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
} = hairQualitySlice.actions;

export default hairQualitySlice.reducer;
