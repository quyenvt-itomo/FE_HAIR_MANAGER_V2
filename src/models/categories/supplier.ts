import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";

export interface SupplierQuery extends ApiRequestQuery {
}

export interface SupplierData {
  id: number;
  name: string;
  code: string;
  symbol: string;
  phone_number: string;
  email: string;
  address: string;
  avatar: string;
  description?: string;
  initial_debt: number;
}

export interface SupplierResponse extends ApiResponse {}
