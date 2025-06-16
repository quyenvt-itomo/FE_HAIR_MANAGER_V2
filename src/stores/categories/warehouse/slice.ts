import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { WAREHOUSE_MESSAGES } from "../../../constants/message/categories/warehouse";
import {
  WarehouseData,
  WarehouseQuery,
  WarehouseResponse,
} from "../../../models/categories/warehouse";

const initialState = createBaseInitialState<WarehouseData>();

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    ...createBaseReducers<WarehouseData, WarehouseQuery, WarehouseResponse>(
      WAREHOUSE_MESSAGES
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
} = warehouseSlice.actions;

export default warehouseSlice.reducer;
