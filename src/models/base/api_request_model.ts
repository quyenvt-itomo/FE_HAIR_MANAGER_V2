export interface ApiRequestQuery {
  startAt?: string;
  endAt?: string;
  page?: number;
  size?: number;
  keyword?: string;
  type?: string;
  sortBy?: string;
  sortType?: string;
  status?: string;

  supplier_ids?: string;
  customer_ids?: string;
  product_ids?: string;
  hair_color_ids?: string;
  employee_purchase_ids?: string;
  employee_ids?: string;
  warehouse_ids?: string;
}

export interface ImportExcelData {
  url: string;
}
