import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { LengthData } from "../../models/categories/attribute";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/length/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useLengthData = ({
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
    data: lengthData,
    dataById: lengthDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Length as BaseState<LengthData>,
    shallowEqual
  );

  const fetchLengthData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
        type: "LENGTH",
      })
    );
  };

  const addLength = (newLength: LengthData) => {
    newLength.type = "LENGTH";
    dispatch(addItem(newLength));
  };

  const getLength = (id: number) => {
    dispatch(getItem(id));
  };

  const updateLength = (updatedLength: LengthData) => {
    updatedLength.type = "LENGTH";
    dispatch(updateItem(updatedLength));
  };

  const deleteLength = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchLengthData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchLengthData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    lengthData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addLength,
    getLength,
    updateLength,
    deleteLength,
  };
};
