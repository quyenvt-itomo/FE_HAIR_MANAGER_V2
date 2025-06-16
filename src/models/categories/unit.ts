import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";

export interface UnitQuery extends ApiRequestQuery {
  more_query?: any;
}

export interface UnitData {
  id?: number;
  code?: string;
  name?: string;
}

export interface UnitResponse extends ApiResponse {}
