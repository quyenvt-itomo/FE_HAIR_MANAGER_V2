import * as ProductActions from "./slice";
import { apiEndpoint } from "../../../constants/ApiEndpoint";
import { createBaseSaga } from "../../createBaseSaga";
import {
  ProductData,
  ProductQuery,
  ProductResponse,
} from "../../../models/categories/product";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { handleErrorMessage } from "../../../utils/handleMessageError";
import { postData } from "../../../api/apiClient";

const approveItemSuccess = ProductActions.approveItemSuccess as (
  payload: ProductResponse
) => any;
const approveItemFailure = ProductActions.approveItemFailure as (
  payload: any
) => any;
const {
  getAllSuccess,
  getAllFailure,
  getItemSuccess,
  getItemFailure,
  addItemSuccess,
  addItemFailure,
  updateItemSuccess,
  updateItemFailure,
  deleteItemSuccess,
  deleteItemFailure,
} = ProductActions;

function* approveItemSaga(): Generator {
  yield takeLatest(
    "product/approveItem",
    function* (action: PayloadAction<number>) {
      try {
        const response: ProductResponse = yield call(() =>
          postData(`${apiEndpoint.product.approve}`, action.payload)
        );
        yield put(approveItemSuccess(response));
      } catch (error: any) {
        yield put(
          approveItemFailure(handleErrorMessage(error, "add", "product"))
        );
      }
    }
  );
}

export const ProductSaga = createBaseSaga<ProductData, ProductQuery>({
  name: "produce",
  api: apiEndpoint.product.base,
  actions: {
    getAllSuccess,
    getAllFailure,
    getItemSuccess,
    getItemFailure,
    addItemSuccess,
    addItemFailure,
    updateItemSuccess,
    updateItemFailure,
    deleteItemSuccess,
    deleteItemFailure,
  },
  extraSagas: [approveItemSaga],
});
