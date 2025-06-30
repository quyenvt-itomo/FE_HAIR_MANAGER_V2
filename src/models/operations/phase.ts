import { ApiRequestQuery } from "../base/api_request_model";
import { ApiResponse } from "../base/api_response_model";

export interface PhaseQuery extends ApiRequestQuery {
  moreQuery?: any;
  type?: string;
  getForMe?: boolean;
}

export interface PhaseData {
    id: number;
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PhaseResponse extends ApiResponse {}
