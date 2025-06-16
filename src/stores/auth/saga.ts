import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  getDataInfoSuccess,
  getDataInfoFailure,
  updateDataInfoSuccess,
  updateDataInfoFailure,
  updateDataInfo,
  changePasswordSuccess,
  changePasswordFailure,
} from "./slice";
import { getData, postData, putData } from "../../api/apiClient";
import { apiEndpoint } from "../../constants/ApiEndpoint";
import { LoginRequest, LogoutRequest, UserInfo } from "../../models/auth_model";
import { handleErrorMessage } from "../../utils/handleMessageError";

function* loginSaga(action: PayloadAction<LoginRequest>): SagaIterator {
  try {
    const response = yield call(() =>
      postData(apiEndpoint.auth.login, action.payload)
    );

    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailure(error));
  }
}

function* logoutSage(action: PayloadAction<LogoutRequest>): SagaIterator {
  try {
    const response = yield call(() =>
      postData(apiEndpoint.auth.logout, action.payload)
    );
    yield put(logoutSuccess(response));
  } catch (error: any) {
    yield put(logoutFailure(error));
  }
}

function* getDataInfoSaga(): SagaIterator {
  try {
    const response = yield call(() => getData(`${apiEndpoint.auth.data_info}`));
    yield put(getDataInfoSuccess(response));
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);
    yield put(getDataInfoFailure(errorMessage));
  }
}

function* changePasswordSaga(): SagaIterator {
  try {
    const response = yield call(() => getData(`${apiEndpoint.auth.change_password}`));
    yield put(changePasswordSuccess(response));
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);
    yield put(changePasswordFailure(errorMessage));
  }
}

function* updateDataSaga(action: PayloadAction<UserInfo>): SagaIterator {
  try {
    const response = yield call(() =>
      putData(`${apiEndpoint.auth.update_info}`, action.payload)
    );
    yield put(updateDataInfoSuccess(response.data));
  } catch (error: any) {
    const errorMessage = handleErrorMessage(error);

    yield put(updateDataInfoFailure(errorMessage));
  }
}

export function* AuthSaga() {
  yield takeLatest("auth/login", loginSaga);
  yield takeLatest("auth/logout", logoutSage);
  yield takeLatest("auth/getDataInfo", getDataInfoSaga);
  yield takeLatest("auth/changePassword", changePasswordSaga);
  yield takeLatest("auth/updateDataInfo", updateDataSaga);
}
