import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { deleteData, getData, postData, putData } from "../api/apiClient";
import { handleErrorMessage, ObjectKeys } from "../utils/handleMessageError";

interface CreateBaseSagaParams<TData, TQuery> {
  name: ObjectKeys;
  api: string;
  actions: {
    getAllSuccess: any;
    getAllFailure: any;

    getItemSuccess: any;
    getItemFailure: any;

    addItemSuccess: any;
    addItemFailure: any;

    updateItemSuccess: any;
    updateItemFailure: any;

    deleteItemSuccess: any;
    deleteItemFailure: any;
  };

  extraSagas?: (() => Generator<any, any, any>)[];  // Mặc định là một mảng rỗng
}

export function createBaseSaga<TData = any, TQuery = any>({
  name,
  api,
  actions,
  extraSagas = [],  // Mặc định là một mảng rỗng
}: CreateBaseSagaParams<TData, TQuery>) {

  function* getAllSaga(action: PayloadAction<TQuery>): SagaIterator {
    try {
      const response = yield call(() => getData(api, action.payload));
      yield put(actions.getAllSuccess(response));
    } catch (error: any) {
      yield put(actions.getAllFailure(handleErrorMessage(error, "get", name)));
    }
  }

  function* getItemSaga(action: PayloadAction<number>): SagaIterator {
    try {
      const response = yield call(() => getData(`${api}/${action.payload}`));
      yield put(actions.getItemSuccess(response));
    } catch (error: any) {
      yield put(actions.getItemFailure(handleErrorMessage(error, "get", name)));
    }
  }

  function* addItemSaga(action: PayloadAction<TData>): SagaIterator {
    try {
      const response = yield call(() => postData(api, action.payload));
      yield put(actions.addItemSuccess(response));
    } catch (error: any) {
      yield put(actions.addItemFailure(handleErrorMessage(error, "add", name)));
    }
  }

  function* updateItemSaga(action: PayloadAction<TData>): SagaIterator {
    try {
      const response = yield call(() =>
        putData(
          `${
            (action.payload as any).id
              ? `${api}/${(action.payload as any).id}`
              : api
          }`,
          action.payload
        )
      );
      yield put(actions.updateItemSuccess(response.data));
    } catch (error: any) {
      yield put(
        actions.updateItemFailure(handleErrorMessage(error, "update", name))
      );
    }
  }

  function* deleteItemSaga(action: PayloadAction<number>): SagaIterator {
    try {
      const response = yield call(() => deleteData(`${api}/${action.payload}`));
      yield put(actions.deleteItemSuccess(response.data));
    } catch (error: any) {
      yield put(
        actions.deleteItemFailure(handleErrorMessage(error, "delete", name))
      );
    }
  }

  function* saga(): SagaIterator {
    yield takeEvery(`${name}/getAll`, getAllSaga);
    yield takeEvery(`${name}/getItem`, getItemSaga);
    yield takeEvery(`${name}/addItem`, addItemSaga);
    yield takeEvery(`${name}/updateItem`, updateItemSaga);
    yield takeEvery(`${name}/deleteItem`, deleteItemSaga);

    // Gọi thêm các saga mở rộng nếu có
    if (extraSagas?.length) {
      for (const extra of extraSagas) {
        yield* extra();
      }
    }
  }

  return saga;
}
