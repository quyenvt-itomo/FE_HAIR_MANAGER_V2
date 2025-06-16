export interface PaginationProps {
  totalRecords: number;
  size: number;
  totalPages: number;
  currentPage: number;
}

export type summaryKey =
  | "total_quantity"
  | "total_money"
  | "total_amount"
  | "total_amount_paid"
  | "total_amount_debt"
  | "total_commission"
  | "total_commission_paid"
  | "total_commission_debt"
  | "total_quantity_difference"
  | "total_money_difference"

  // TODO: Công nợ
  | "total_beginning_debt"
  | "total_debt_increase"
  | "total_debt_reduction"
  | "total_ending_debt"

  // TODO: Thu chi
  | "total_income"
  | "total_expense"

  // TODO: Tiền vay
  | "total_current_debt"
  | "total_interest_amount"
  | "total_payment_amount"

  // TODO: Tiền gửi
  | "total_compound_interest"
  | "total_real_compound_interest";

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
