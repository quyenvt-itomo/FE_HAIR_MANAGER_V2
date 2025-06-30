import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { ORDER_MESSAGES } from "../../../constants/message/operations/order";
import { SaleData, SaleQuery, SaleResponse } from "../../../models/operations/sale";

const initialState = createBaseInitialState<SaleData>();

const orderSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    ...createBaseReducers<SaleData, SaleQuery, SaleResponse>(
      ORDER_MESSAGES
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
} = orderSlice.actions;

export default orderSlice.reducer;
