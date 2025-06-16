import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { getData, postData } from "../../api/apiClient";

import {
  ExcelTemplateQuery,
  ExportExcelQuery,
  ImportExcelData,
} from "../../models/base/excel_model";
import { handleErrorMessage, ObjectKeys } from "../../utils/handleMessageError";
import { apiEndpoint } from "../../constants/ApiEndpoint";
import {
  exportExcelFailure,
  exportExcelSuccess,
  getTemplateFailure,
  getTemplateSuccess,
  importExcelFailure,
  importExcelSuccess,
} from "./slice";

const objectKey: ObjectKeys = "excel";

function* getTemplateSaga(
  action: PayloadAction<ExcelTemplateQuery>
): SagaIterator {
  try {
    const response = yield call(() =>
      getData(apiEndpoint.excel.template, action.payload)
    );
    yield put(getTemplateSuccess(response));
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error, "get", objectKey);
    yield put(getTemplateFailure(errorMessage));
  }
}

function* importExcelSaga(
  action: PayloadAction<ImportExcelData>
): SagaIterator {
  try {
    const response = yield call(() =>
      postData(apiEndpoint.excel.import, action.payload)
    );
    yield put(importExcelSuccess(response));
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error, "update", objectKey);

    yield put(importExcelFailure(errorMessage));
  }
}

function* exportExcelSaga(
  action: PayloadAction<ExportExcelQuery>
): SagaIterator {
  try {
    const response = yield call(() =>
      getData(apiEndpoint.excel.export, action.payload)
    );
    yield put(exportExcelSuccess(response));
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error, "get", objectKey);

    yield put(exportExcelFailure(errorMessage));
  }
}

export function* ExcelSaga() {
  yield takeLatest("excel/getTemplate", getTemplateSaga);

  yield takeLatest("excel/importExcel", importExcelSaga);

  yield takeLatest("excel/exportExcel", exportExcelSaga);
}
