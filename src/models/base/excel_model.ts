import { ApiRequestQuery } from "./api_request_model";
import { ApiResponse } from "./api_response_model";

export type ExcelType =
  | "purchaseOrder"
  | "purchaseDebtComparison"
  | "purchaseDebtReport"
  | "purchaseDebtCommissionReport"
  | "inventoryReceipt"
  | "purchaseContract"
  | "bankTransaction";

export interface ExportExcelQuery
  extends Omit<ApiRequestQuery, "page" | "size" | "keyword"> {
  type: ExcelType;
  id?: number;
  fileType?: "pdf" | "excel";
}

export interface ExcelTemplateQuery {
  type: ExcelType;
}

export interface ImportExcelData {
  type: ExcelType;
  file_url: string;
}

export interface ImportExcelResult {
  total: number;
  success: number;
  url?: string;
}

export interface ImportResponse extends ApiResponse {}

export interface ExcelTemplateData {
  url: string;
}

export interface ExcelResponse extends ApiResponse {}
