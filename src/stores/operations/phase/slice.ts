import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { PHASE_MESSAGES } from "../../../constants/message/operations/phase";
import { PhaseData, PhaseQuery, PhaseResponse } from "../../../models/operations/phase";

const initialState = createBaseInitialState<PhaseData>();

const phaseSlice = createSlice({
  name: "phase",
  initialState,
  reducers: {
    ...createBaseReducers<PhaseData, PhaseQuery, PhaseResponse>(
      PHASE_MESSAGES
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
} = phaseSlice.actions;

export default phaseSlice.reducer;
