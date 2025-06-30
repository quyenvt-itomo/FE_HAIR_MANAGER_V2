import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";
import { CustomerData } from "../categories/customer";
import { EmployeeData } from "../employee";

export interface SaleQuery extends ApiRequestQuery {
  moreQuery?: any;
  type?: string;
}

export interface SaleDetailData {
  id: number;
  code: string;
  productName: string;
  quantity: number;
  price: number;
  note?: string;
}

export interface SaleData {
  id: number;
  timeAt?: Date;
  phoneNumber: string;
  address?: string | null;
  orderNumber: string;
  description?: string | null;
  totalPrice: number;

  partnerId?: number;
  partner?: CustomerData;

  employeeId?: number;
  employee?: EmployeeData;

  files: string[];

  // TODO: to Add
  details: SaleDetailData[];

  // TODO: to Update
  adds: SaleDetailData[];
  updates: SaleDetailData[];
  deletes: number[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SaleResponse extends ApiResponse {}
