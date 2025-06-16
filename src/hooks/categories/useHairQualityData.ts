import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { HairQualityData } from "../../models/categories/attribute";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/hair_quality/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useHairQualityData = ({
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
    data: hairQualityData,
    dataById: hairQualityDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.HairQuality as BaseState<HairQualityData>,
    shallowEqual
  );

  const fetchHairQualityData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        limit,
        keyword,
        type: "HAIR_QUALITY",
      })
    );
  };

  const addHairQuality = (newHairQuality: HairQualityData) => {
    newHairQuality.type = "HAIR_QUALITY";
    dispatch(addItem(newHairQuality));
  };

  const getHairQuality = (id: number) => {
    dispatch(getItem(id));
  };

  const updateHairQuality = (updatedHairQuality: HairQualityData) => {
    updatedHairQuality.type = "HAIR_QUALITY";
    dispatch(updateItem(updatedHairQuality));
  };

  const deleteHairQuality = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchHairQualityData();
  }, [dispatch, page, limit, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchHairQualityData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    hairQualityData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addHairQuality,
    getHairQuality,
    updateHairQuality,
    deleteHairQuality,
  };
};
