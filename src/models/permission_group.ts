import { ApiRequestQuery } from "./base/api_request_model";
import { ApiResponse } from "./base/api_response_model";
import { PermissionData } from "./permission";

export interface PermissionGroupQuery extends ApiRequestQuery {
  moreQuery?: any;
  type?: string;
}

export interface PermissionGroupData {
  id: number;
  name: string;
  description?: string;

  permissionIds: number[];
  permissionDetail: PermissionData[];

  isDefault?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PermissionGroupResponse extends ApiResponse {}
