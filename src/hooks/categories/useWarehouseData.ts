import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { WarehouseData } from "../../models/categories/warehouse";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/warehouse/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

interface UseWahouseDataParams extends UseDataParams {
  productId?: number;
}

export const useWarehouseData = ({
  keyword,
  page,
  size,
  sortBy,
  sortType,
  onCloseModal,
  isLockHook,
  productId,
}: UseWahouseDataParams) => {
  const dispatch = useDispatch();
  const {
    data: warehouseData,
    dataById: warehouseDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Warehouse as BaseState<WarehouseData>,
    shallowEqual
  );

  const fetchWarehouseData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
        productId
      })
    );
  };

  const addWarehouse = (newWarehouse: WarehouseData) => {
    dispatch(addItem(newWarehouse));
  };

  const getWarehouse = (id: number) => {
    dispatch(getItem(id));
  };

  const updateWarehouse = (updatedWarehouse: WarehouseData) => {
    dispatch(updateItem(updatedWarehouse));
  };

  const deleteWarehouse = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchWarehouseData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook, productId]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchWarehouseData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    warehouseData,
    warehouseDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addWarehouse,
    getWarehouse,
    updateWarehouse,
    deleteWarehouse,
  };
};
