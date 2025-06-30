export interface PaginationProps {
  totalRecords: number;
  size: number;
  totalPages: number;
  currentPage: number;
}

export type summaryKey =
  | "totalQuantity"
  | "totalMoney"

  // TODO: Công nợ
  | "totalBeginningDebt"
  | "totalDebtIncrease"
  | "totalDebtReduction"
  | "totalEndingDebt"

export type SummaryData = {
  [key in summaryKey]?: number;
};

export interface ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  pagination?: PaginationProps;
  detailError?: any[];
  summary?: SummaryData;
}
