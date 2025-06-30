import { ApiRequestQuery } from "./base/api_request_model";
import { ApiResponse } from "./base/api_response_model";
import { PermissionData } from "./permission";
import { PermissionGroupData } from "./permission_group";

export interface EmployeeQuery extends ApiRequestQuery {
  moreQuery?: any;
  type?: string;
}

export interface EmployeeData {
  id: number;
  code?: string;
  avatar?: string | null;
  name: string;
  phoneNumber: string;
  address?: string;
  username: string;
  email: string;
  role: string | null;
  permission: PermissionData[];

  status: boolean;

  permissionGroupIds?: number[];
  permissionGroup: PermissionGroupData[];

  // leaderOfTeam?: number[];
  leaderOfTeam?: any[];

  access: boolean;
  active: boolean;

  position: string;
  isCreateAccount?: boolean;
  password?: string;
  departmentId: number;
  gender: string;
  description: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EmployeeResponse extends ApiResponse {}
