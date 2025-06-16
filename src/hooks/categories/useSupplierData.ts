import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { SupplierData } from "../../models/categories/supplier";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/supplier/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useSupplierData = ({
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
    data: supplierData,
    dataById: supplierDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Supplier as BaseState<SupplierData>,
    shallowEqual
  );

  const fetchSupplierData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
      })
    );
  };

  const addSupplier = (newSupplier: SupplierData) => {
    dispatch(addItem(newSupplier));
  };

  const getSupplier = (id: number) => {
    dispatch(getItem(id));
  };

  const updateSupplier = (updatedSupplier: SupplierData) => {
    dispatch(updateItem(updatedSupplier));
  };

  const deleteSupplier = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchSupplierData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchSupplierData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    supplierData,
    supplierDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier,
  };
};
