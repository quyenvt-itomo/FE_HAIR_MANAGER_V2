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

  supplierIds?: string;
  customerIds?: string;
  productIds?: string;
  hairColorIds?: string;
  employee_purchaseIds?: string;
  employeeIds?: string;
  warehouseIds?: string;
}

export interface ImportExcelData {
  url: string;
}
