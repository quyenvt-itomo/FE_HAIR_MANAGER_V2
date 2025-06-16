import * as PermissionGroupActions from "./slice";
import { apiEndpoint } from "../../constants/ApiEndpoint";
import { createBaseSaga } from "../createBaseSaga";
import { PermissionGroupData, PermissionGroupQuery, PermissionGroupResponse } from "../../models/permission_group";

const {
  getAllSuccess,
  getAllFailure,
  getItemSuccess,
  getItemFailure,
  addItemSuccess,
  addItemFailure,
  updateItemSuccess,
  updateItemFailure,
  deleteItemSuccess,
  deleteItemFailure,
} = PermissionGroupActions;

export const PermissionGroupSaga = createBaseSaga<PermissionGroupData, PermissionGroupQuery>({
  name: "permission_group",
  api: apiEndpoint.permission_group.base,
  actions: {
    getAllSuccess,
    getAllFailure,
    getItemSuccess,
    getItemFailure,
    addItemSuccess,
    addItemFailure,
    updateItemSuccess,
    updateItemFailure,
    deleteItemSuccess,
    deleteItemFailure,
  },
});
