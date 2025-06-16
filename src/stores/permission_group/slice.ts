import { createSlice } from "@reduxjs/toolkit";

import {
  PermissionGroupData,
  PermissionGroupQuery,
  PermissionGroupResponse,
} from "../../models/permission_group";
import { PERMISSION_GROUP_MESSAGES } from "../../constants/message/permission_group";
import { createBaseInitialState, createBaseReducers } from "../baseReducers";

const initialState = createBaseInitialState<PermissionGroupData>();

const permissionGroupSlice = createSlice({
  name: "permission_group",
  initialState,
  reducers: {
    ...createBaseReducers<
      PermissionGroupData,
      PermissionGroupQuery,
      PermissionGroupResponse
    >(PERMISSION_GROUP_MESSAGES),
  },
});

export const {
  getAll,
  getAllSuccess,
  getAllFailure,
  getItem,
  getItemSuccess,
  getItemFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  updateItem,
  updateItemSuccess,
  updateItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
  clearMessage,
  reset,
  resetErrors,
} = permissionGroupSlice.actions;

export default permissionGroupSlice.reducer;
