import { ApiRequestQuery } from "./base/api_request_model";
import { ApiResponse } from "./base/api_response_model";

export interface PermissionQuery extends ApiRequestQuery {
  moreQuery?: any;
  type?: string;
}

export interface PermissionData {
  id: number;
  name: string;
  group: string;
  isDepartment: boolean;
  check: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PermissionResponse extends ApiResponse {}
