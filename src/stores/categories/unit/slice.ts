import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { UNIT_MESSAGES } from "../../../constants/message/categories/unit";
import {
  UnitData,
  UnitQuery,
  UnitResponse,
} from "../../../models/categories/attribute";

const initialState = createBaseInitialState<UnitData>();

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    ...createBaseReducers<UnitData, UnitQuery, UnitResponse>(
      UNIT_MESSAGES
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
} = unitSlice.actions;

export default unitSlice.reducer;
