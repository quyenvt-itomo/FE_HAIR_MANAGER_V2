import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { HairToneData } from "../../models/categories/attribute";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/hair_tone/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useHairToneData = ({
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
    data: hairToneData,
    dataById: hairToneDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.HairTone as BaseState<HairToneData>,
    shallowEqual
  );

  const fetchHairToneData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
        type: "HAIR_TONE",
      })
    );
  };

  const addHairTone = (newHairTone: HairToneData) => {
    newHairTone.type = "HAIR_TONE";
    dispatch(addItem(newHairTone));
  };

  const getHairTone = (id: number) => {
    dispatch(getItem(id));
  };

  const updateHairTone = (updatedHairTone: HairToneData) => {
    updatedHairTone.type = "HAIR_TONE";
    dispatch(updateItem(updatedHairTone));
  };

  const deleteHairTone = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchHairToneData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchHairToneData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    hairToneData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addHairTone,
    getHairTone,
    updateHairTone,
    deleteHairTone,
  };
};
