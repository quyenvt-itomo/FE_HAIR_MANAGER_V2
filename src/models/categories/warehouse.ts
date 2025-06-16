import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";
import { PhaseData } from "../operations/phase";

export interface WarehouseQuery extends ApiRequestQuery {
  product_id?: number;
}

export interface WarehouseData {
  id: number;
  name: string;
  code: string;

  phase_id?: number;
  phase_data: PhaseData;

  phone_number: string;
  address: string;
  description: string;
  current_balance?: number;
}

export interface WarehouseResponse extends ApiResponse {}
