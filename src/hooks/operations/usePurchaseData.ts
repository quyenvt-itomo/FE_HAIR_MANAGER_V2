import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { PurchaseData } from "../../models/operations/purchase";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/operations/purchase/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";
import { transformFilters } from "../../utils/filterUtils";

export const usePurchaseData = ({
  keyword,
  page,
  size,
  sortBy,
  sortType,
  filters,
  startAt,
  endAt,
  onCloseModal,
  isLockHook,
}: UseDataParams) => {
  const dispatch = useDispatch();
  const {
    data: purchaseData,
    dataById: purchaseDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Purchase as BaseState<PurchaseData>,
    shallowEqual
  );

  const fetchPurchaseData = () => {
    if (isLockHook) return;
    const { employee_ids, ...otherFilter } = transformFilters(filters);
    dispatch(
      getAll({
        page,
        size,
        keyword,
        startAt,
        endAt,
        employee_purchase_ids: employee_ids,
        ...otherFilter,
      })
    );
  };

  const addPurchase = (newPurchase: PurchaseData) => {
    dispatch(addItem(newPurchase));
  };

  const getPurchase = (id: number) => {
    dispatch(getItem(id));
  };

  const updatePurchase = (updatedPurchase: PurchaseData) => {
    dispatch(updateItem(updatedPurchase));
  };

  const deletePurchase = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchPurchaseData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook, filters, startAt, endAt]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchPurchaseData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    purchaseData,
    purchaseDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addPurchase,
    getPurchase,
    updatePurchase,
    deletePurchase,
  };
};
