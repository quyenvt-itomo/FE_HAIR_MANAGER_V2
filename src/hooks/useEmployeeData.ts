import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import { BaseState } from "../stores/baseReducers";
import { EmployeeData } from "../models/employee";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../stores/employee/slice";
import { useEffect } from "react";
import { UseDataParams } from "../models/base/hook_model";

export const useEmployeeData = ({
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
    data: employeeData,
    dataById: employeeDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Employee as BaseState<EmployeeData>,
    shallowEqual
  );

  const fetchEmployeeData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
      })
    );
  };

  const addEmployee = (newEmployee: EmployeeData) => {
    dispatch(addItem(newEmployee));
  };

  const getEmployee = (id: number) => {
    dispatch(getItem(id));
  };

  const updateEmployee = (updatedEmployee: EmployeeData) => {
    dispatch(updateItem(updatedEmployee));
  };

  const deleteEmployee = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchEmployeeData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    employeeData,
    employeeDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
