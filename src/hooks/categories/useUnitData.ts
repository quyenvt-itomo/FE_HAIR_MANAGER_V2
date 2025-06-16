import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { UnitData } from "../../models/categories/attribute";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/unit/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useUnitData = ({
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
    data: unitData,
    dataById: unitDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Unit as BaseState<UnitData>,
    shallowEqual
  );

  const fetchUnitData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        limit,
        keyword,
        type: "UNIT",
      })
    );
  };

  const addUnit = (newUnit: UnitData) => {
    newUnit.type = "UNIT";
    dispatch(addItem(newUnit));
  };

  const getUnit = (id: number) => {
    dispatch(getItem(id));
  };

  const updateUnit = (updatedUnit: UnitData) => {
    updatedUnit.type = "UNIT";
    dispatch(updateItem(updatedUnit));
  };

  const deleteUnit = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchUnitData();
  }, [dispatch, page, limit, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchUnitData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    unitData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addUnit,
    getUnit,
    updateUnit,
    deleteUnit,
  };
};
