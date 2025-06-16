import { ApiRequestQuery } from "./base/api_request_model";
import { ApiResponse } from "./base/api_response_model";
import { PermissionData } from "./permission";
import { PermissionGroupData } from "./permission_group";

export interface EmployeeQuery extends ApiRequestQuery {
  more_query?: any;
  type?: string;
}

export interface EmployeeData {
  id: number;
  code?: string;
  avatar?: string;
  name: string;
  phone_number: string;
  address?: string;
  username: string;
  email: string;
  role: string | null;
  permission: PermissionData[];

  status: boolean;

  permission_group_ids?: number[];
  permission_group: PermissionGroupData[];

  // leader_of_team?: number[];
  leader_of_team?: any[];

  access: boolean;
  active: boolean;

  position: string;
  is_create_account?: boolean;
  password?: string;
  department_id: number;
  gender: string;
  description: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EmployeeResponse extends ApiResponse {}
