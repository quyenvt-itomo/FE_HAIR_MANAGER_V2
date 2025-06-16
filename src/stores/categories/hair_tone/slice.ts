import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { HAIR_TONE_MESSAGES } from "../../../constants/message/categories/hair_tone";
import {
  HairToneData,
  HairToneQuery,
  HairToneResponse,
} from "../../../models/categories/attribute";

const initialState = createBaseInitialState<HairToneData>();

const hairToneSlice = createSlice({
  name: "hair_tone",
  initialState,
  reducers: {
    ...createBaseReducers<HairToneData, HairToneQuery, HairToneResponse>(
      HAIR_TONE_MESSAGES
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
} = hairToneSlice.actions;

export default hairToneSlice.reducer;
