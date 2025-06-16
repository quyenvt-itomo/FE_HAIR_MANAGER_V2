import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import {
  exportExcel,
  getTemplate,
  importExcel,
  resetExcel,
} from "../stores/excel/slice";

import { downloadFile } from "../utils/downloadFile";
import {
  ExportExcelQuery,
  FileType,
  ImportExcelData,
} from "../models/base/excel_model";
import { showImportResultModal } from "../components/modal/ImportResult";

interface useExcelDataParams extends Omit<ExportExcelQuery, "fileType"> {}

export const useExcelData = (query?: useExcelDataParams) => {
  const dispatch = useDispatch();
  const { import_result, loading, template, export_result } = useSelector(
    (state: RootState) => state.Excel,
    shallowEqual
  );

  const getCurrentTemplate = () => {
    if (!query) return;
    dispatch(getTemplate(query));
  };

  const importCurrentExcel = (excelData: ImportExcelData) => {
    dispatch(importExcel(excelData));
  };

  const exportCurrentExcel = (fileType: FileType) => {
    if (!query) return;
    dispatch(exportExcel({ ...query, fileType }));
  };

  useEffect(() => {
    if (!template || query) return;
    downloadFile(template.url);
    dispatch(resetExcel());
  }, [template]);

  useEffect(() => {
    if (!import_result || query) return;
    dispatch(resetExcel());
    showImportResultModal(import_result);
  }, [import_result]);

  useEffect(() => {
    if (!export_result || query) return;
    console.log("Export result changed:", export_result);

    dispatch(resetExcel());
    downloadFile(export_result);
  }, [export_result]);

  return {
    loading,
    exportCurrentExcel,
    getCurrentTemplate,
    importCurrentExcel,
  };
};
