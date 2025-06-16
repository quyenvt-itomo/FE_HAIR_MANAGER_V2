import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { CustomerData } from "../../models/categories/customer";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/customer/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useCustomerData = ({
  keyword,
  page,
  limit,
  sortBy,
  sortType,
  onCloseModal,
  isLockHook,
}: UseDataParams) => {
  const dispatch = useDispatch();
  const {
    data: customerData,
    dataById: customerDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Customer as BaseState<CustomerData>,
    shallowEqual
  );

  const fetchCustomerData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        limit,
        keyword,
      })
    );
  };

  const addCustomer = (newCustomer: CustomerData) => {
    dispatch(addItem(newCustomer));
  };

  const getCustomer = (id: number) => {
    dispatch(getItem(id));
  };

  const updateCustomer = (updatedCustomer: CustomerData) => {
    dispatch(updateItem(updatedCustomer));
  };

  const deleteCustomer = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchCustomerData();
  }, [dispatch, page, limit, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchCustomerData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    customerData,
    customerDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
  };
};
