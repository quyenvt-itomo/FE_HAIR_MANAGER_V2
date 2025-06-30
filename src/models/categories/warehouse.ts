import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";
import { PhaseData } from "../operations/phase";

export interface WarehouseQuery extends ApiRequestQuery {
  productId?: number;
}

export interface WarehouseData {
  id: number;
  name: string;
  code: string;

  phaseId?: number;
  phase: PhaseData;

  phoneNumber: string;
  address: string;
  description: string;
  currentBalance?: number;
}

export interface WarehouseResponse extends ApiResponse {}
