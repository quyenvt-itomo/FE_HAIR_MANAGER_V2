import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TypeMessage } from "../../enums/typeMessage";
import i18next from "i18next";
import {
  ExcelTemplateData,
  ExcelTemplateQuery,
  ImportExcelData,
  ExcelResponse,
  ExportExcelQuery,
  ImportExcelResult,
  ImportResponse,
} from "../../models/base/excel_model";
import { MessageToastModel } from "../../types/message_toast_model";
import { BaseFailurePayload } from "../baseReducers";

interface ExcelState {
  loading: boolean;
  message: MessageToastModel;
  template: ExcelTemplateData | null;
  import_result: ImportExcelResult | null;
  export_result: string | null;
  isCheckAdd: boolean;
}

const initialState: ExcelState = {
  loading: false,
  message: { type: TypeMessage.none },
  template: null,
  import_result: null,
  export_result: null,
  isCheckAdd: false,
};

const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    clearMessage: (state: ExcelState) => {
      state.message = { type: TypeMessage.none };
    },

    reset: (state: ExcelState) => {
      state.isCheckAdd = false;
    },

    // TODO: Get template
    getTemplate: (state, action: PayloadAction<ExcelTemplateQuery>) => {
      // state.loading = true;
    },
    getTemplateSuccess: (state, action: PayloadAction<ExcelResponse>) => {
      // state.loading = false;
      state.template = action.payload.data;
      state.message = {
        type: TypeMessage.success,
        message: "Tải file mẫu thành công",
      };
    },
    getTemplateFailure: (state, action: PayloadAction<BaseFailurePayload>) => {
      // state.loading = false;
      state.message = {
        type: TypeMessage.error,
        message: action.payload.message,
      };
    },

    // TODO: Import
    importExcel: (state, _action: PayloadAction<ImportExcelData>) => {
      state.loading = true;
    },
    importExcelSuccess: (state, action: PayloadAction<ImportResponse>) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.success,
        message: "Hoàn tất",
      };
      state.import_result = action.payload.data;
      state.isCheckAdd = true;
    },
    importExcelFailure: (state, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.error,
        message: action.payload.message,
      };
      state.import_result = null;
      state.isCheckAdd = false;
    },

    // TODO: Delete
    exportExcel: (
      state,
      action: PayloadAction<ExportExcelQuery | undefined>
    ) => {
      state.loading = true;
    },
    exportExcelSuccess: (state, action: PayloadAction<ExcelResponse>) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.success,
        message: "Hoàn tất",
      };
      state.export_result = action.payload.data;
    },
    exportExcelFailure: (state, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.error,
        message: action.payload.message,
      };
      state.export_result = null;
    },

    // TODO: Reset
    resetExcel: (state) => {
      return { ...initialState };
    },
  },
});

export const {
  clearMessage,

  getTemplate,
  getTemplateFailure,
  getTemplateSuccess,

  importExcel,
  importExcelFailure,
  importExcelSuccess,

  exportExcel,
  exportExcelFailure,
  exportExcelSuccess,

  reset,
  resetExcel,
} = excelSlice.actions;

export default excelSlice.reducer;
