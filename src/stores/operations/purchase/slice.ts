import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { PURCHASE_MESSAGES } from "../../../constants/message/operations/purchase";
import { PurchaseData, PurchaseQuery, PurchaseResponse } from "../../../models/operations/purchase";

const initialState = createBaseInitialState<PurchaseData>();

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    ...createBaseReducers<PurchaseData, PurchaseQuery, PurchaseResponse>(
      PURCHASE_MESSAGES
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
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
