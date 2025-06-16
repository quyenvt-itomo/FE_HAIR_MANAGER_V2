import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { CUSTOMER_MESSAGES } from "../../../constants/message/categories/customer";
import {
  CustomerData,
  CustomerQuery,
  CustomerResponse,
} from "../../../models/categories/customer";

const initialState = createBaseInitialState<CustomerData>();

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    ...createBaseReducers<CustomerData, CustomerQuery, CustomerResponse>(
      CUSTOMER_MESSAGES
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
} = customerSlice.actions;

export default customerSlice.reducer;
