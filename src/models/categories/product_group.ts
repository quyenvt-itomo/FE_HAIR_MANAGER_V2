import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";

export interface ProductGroupQuery extends ApiRequestQuery {
  moreQuery?: any;
}

export interface ProductGroupData {
  id: number;
  name: string;
  type: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProductGroupResponse extends ApiResponse {}
