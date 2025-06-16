import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { SUPPLIER_MESSAGES } from "../../../constants/message/categories/supplier";
import {
  SupplierData,
  SupplierQuery,
  SupplierResponse,
} from "../../../models/categories/supplier";

const initialState = createBaseInitialState<SupplierData>();

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    ...createBaseReducers<SupplierData, SupplierQuery, SupplierResponse>(
      SUPPLIER_MESSAGES
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
} = supplierSlice.actions;

export default supplierSlice.reducer;
