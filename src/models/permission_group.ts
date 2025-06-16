import { ApiRequestQuery } from "./base/api_request_model";
import { ApiResponse } from "./base/api_response_model";
import { PermissionData } from "./permission";

export interface PermissionGroupQuery extends ApiRequestQuery {
  more_query?: any;
  type?: string;
}

export interface PermissionGroupData {
  id: number;
  name: string;
  description?: string;

  permission_ids: number[];
  permission_detail: PermissionData[];

  is_default?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PermissionGroupResponse extends ApiResponse {}
