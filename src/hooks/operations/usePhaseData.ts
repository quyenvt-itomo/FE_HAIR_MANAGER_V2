import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { PhaseData } from "../../models/operations/phase";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/operations/phase/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

interface UsePhaseDataParams extends UseDataParams {
  get_for_me?: boolean;
}

export const usePhaseData = ({
  keyword,
  page,
  limit,
  sortBy,
  sortType,
  onCloseModal,
  isLockHook,
  get_for_me,
}: UsePhaseDataParams) => {
  const dispatch = useDispatch();
  const {
    data: phaseData,
    dataById: phaseDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Phase as BaseState<PhaseData>,
    shallowEqual
  );

  const fetchPhaseData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        limit,
        keyword,
        get_for_me,
      })
    );
  };

  const addPhase = (newPhase: PhaseData) => {
    dispatch(addItem(newPhase));
  };

  const getPhase = (id: number) => {
    dispatch(getItem(id));
  };

  const updatePhase = (updatedPhase: PhaseData) => {
    dispatch(updateItem(updatedPhase));
  };

  const deletePhase = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchPhaseData();
  }, [
    dispatch,
    page,
    limit,
    keyword,
    sortBy,
    sortType,
    isLockHook,
    get_for_me,
  ]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchPhaseData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    phaseData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addPhase,
    getPhase,
    updatePhase,
    deletePhase,
  };
};
