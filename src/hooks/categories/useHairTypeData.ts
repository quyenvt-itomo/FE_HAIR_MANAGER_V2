import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { HairTypeData } from "../../models/categories/attribute";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/hair_type/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useHairTypeData = ({
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
    data: hairTypeData,
    dataById: hairTypeDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.HairType as BaseState<HairTypeData>,
    shallowEqual
  );

  const fetchHairTypeData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
        type: "HAIR_TYPE",
      })
    );
  };

  const addHairType = (newHairType: HairTypeData) => {
    newHairType.type = "HAIR_TYPE";
    dispatch(addItem(newHairType));
  };

  const getHairType = (id: number) => {
    dispatch(getItem(id));
  };

  const updateHairType = (updatedHairType: HairTypeData) => {
    updatedHairType.type = "HAIR_TYPE";
    dispatch(updateItem(updatedHairType));
  };

  const deleteHairType = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchHairTypeData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchHairTypeData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    hairTypeData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addHairType,
    getHairType,
    updateHairType,
    deleteHairType,
  };
};
