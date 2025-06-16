import { createSlice } from "@reduxjs/toolkit";
import { createBaseInitialState, createBaseReducers } from "../../baseReducers";
import { PRODUCT_MESSAGES } from "../../../constants/message/categories/product";
import {
  ProductData,
  ProductQuery,
  ProductResponse,
} from "../../../models/categories/product";
import { TypeMessage } from "../../../enums/typeMessage";

const initialState = createBaseInitialState<ProductData>();

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ...createBaseReducers<ProductData, ProductQuery, ProductResponse>(PRODUCT_MESSAGES),

    // Reducer riêng
    approveItem: (state) => {
      state.loading = true;
    },
    approveItemSuccess: (state, action) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.success,
        message: "Phê duyệt thành công",
      };
      state.isCheckUpdate = true;
    },
    approveItemFailure: (state, action) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.error,
        message: action.payload.message,
      };
    },
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
  approveItem,
  approveItemSuccess,
  approveItemFailure,
} = productSlice.actions;

export default productSlice.reducer;
