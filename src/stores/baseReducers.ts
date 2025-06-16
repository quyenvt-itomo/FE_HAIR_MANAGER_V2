import { PayloadAction } from "@reduxjs/toolkit";
import { TypeMessage } from "../enums/typeMessage";
import { MessageToastModel } from "../types/message_toast_model";
import { PaginationProps, ApiResponse } from "../models/base/api_response_model";

// ===== Types =====

export interface BaseError {
  key?: string;
  message: string;
  index_1?: number;
  index_2?: number;
  value?: number;
  element_key?: string;
}

export interface BaseFailurePayload {
  message: string;
  errors: BaseError[];
}

export interface BaseState<T = any, TNew = { id: number }> {
  data: T[];
  dataById: T | null;
  newData: TNew | null;
  loading: boolean;
  message: MessageToastModel;
  errors: BaseError[] | null;
  pagination?: PaginationProps | null;
  isCheckAdd?: boolean;
  isCheckUpdate?: boolean;
  isCheckDelete?: boolean;
}

// ===== Initial State Factory =====

export const createBaseInitialState = <T>(): BaseState<T> => ({
  data: [],
  dataById: null,
  newData: null,
  loading: false,
  message: { type: TypeMessage.none },
  errors: null,
  pagination: null,
  isCheckAdd: false,
  isCheckUpdate: false,
  isCheckDelete: false,
});

// ===== Reducers Factory =====

export function createBaseReducers<TData, TQuery, TResponse extends ApiResponse>(
  messages: { ADD: string; UPDATE: string; DELETE: string }
) {
  return {
    clearMessage: (state: BaseState) => {
      state.message = { type: TypeMessage.none };
    },

    reset: (state: BaseState) => {
      state.isCheckAdd = false;
      state.isCheckUpdate = false;
      state.isCheckDelete = false;
    },

    resetErrors: (state: BaseState) => {
      state.errors = null;
    },

    addItem: (state: BaseState, action: PayloadAction<TData>) => {
      state.loading = true;
    },
    addItemSuccess: (state: BaseState, action: PayloadAction<TResponse>) => {
      state.loading = false;
      state.newData = action.payload.data;
      state.message = { type: TypeMessage.success, message: messages.ADD };
      state.isCheckAdd = true;
    },
    addItemFailure: (state: BaseState, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.errors = action.payload.errors;
      state.message = { type: TypeMessage.error, message: action.payload.message };
      state.isCheckAdd = false;
    },

    getAll: (state: BaseState, action: PayloadAction<TQuery>) => {
      state.loading = true;
    },
    getAllSuccess: (state: BaseState, action: PayloadAction<TResponse>) => {
      state.loading = false;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    getAllFailure: (state: BaseState, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.errors = action.payload.errors;
      state.message = { type: TypeMessage.error, message: action.payload.message };
    },

    getItem: (state: BaseState, action: PayloadAction<number>) => {
      state.loading = true;
    },
    getItemSuccess: (state: BaseState, action: PayloadAction<TResponse>) => {
      state.loading = false;
      state.dataById = action.payload.data;
    },
    getItemFailure: (state: BaseState, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.errors = action.payload.errors;
      state.message = { type: TypeMessage.error, message: action.payload.message };
    },

    updateItem: (state: BaseState, action: PayloadAction<TData>) => {
      state.loading = true;
    },
    updateItemSuccess: (state: BaseState, action: PayloadAction<TData>) => {
      state.loading = false;
      state.message = { type: TypeMessage.success, message: messages.UPDATE };
      state.isCheckUpdate = true;
    },
    updateItemFailure: (state: BaseState, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.errors = action.payload.errors;
      state.message = { type: TypeMessage.error, message: action.payload.message };
    },

    deleteItem: (state: BaseState, action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteItemSuccess: (state: BaseState, action: PayloadAction<number>) => {
      state.loading = false;
      state.message = { type: TypeMessage.success, message: messages.DELETE };
      state.isCheckDelete = true;
    },
    deleteItemFailure: (state: BaseState, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.errors = action.payload.errors;
      state.message = { type: TypeMessage.error, message: action.payload.message };
    },
  };
}
