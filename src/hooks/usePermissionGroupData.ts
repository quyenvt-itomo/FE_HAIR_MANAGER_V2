import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import { BaseState } from "../stores/baseReducers";
import { PermissionGroupData } from "../models/permission_group";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../stores/permission_group/slice";
import { useEffect } from "react";
import { UseDataParams } from "../models/base/hook_model";

export const usePermissionGroupData = ({
  keyword,
  page,
  size,
  sortBy,
  sortType,
  onCloseModal,
  isLockHook,
}: UseDataParams) => {
  const dispatch = useDispatch();
  const {
    data: permissionGroupData,
    dataById: permissionGroupDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.PermissionGroup as BaseState<PermissionGroupData>,
    shallowEqual
  );

  const fetchPermissionGroupData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
      })
    );
  };

  const addPermissionGroup = (newPermissionGroup: PermissionGroupData) => {
    dispatch(addItem(newPermissionGroup));
  };

  const getPermissionGroup = (id: number) => {
    dispatch(getItem(id));
  };

  const updatePermissionGroup = (updatedPermissionGroup: PermissionGroupData) => {
    dispatch(updateItem(updatedPermissionGroup));
  };

  const deletePermissionGroup = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchPermissionGroupData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchPermissionGroupData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    permissionGroupData,
    permissionGroupDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addPermissionGroup,
    getPermissionGroup,
    updatePermissionGroup,
    deletePermissionGroup,
  };
};
