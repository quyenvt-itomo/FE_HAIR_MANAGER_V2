import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { CategoryData } from "../../models/categories/attribute";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/category/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useCategoryData = ({
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
    data: categoryData,
    dataById: categoryDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Category as BaseState<CategoryData>,
    shallowEqual
  );

  const fetchCategoryData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
        type: "CATEGORY",
      })
    );
  };

  const addCategory = (newCategory: CategoryData) => {
    newCategory.type = "CATEGORY";
    dispatch(addItem(newCategory));
  };

  const getCategory = (id: number) => {
    dispatch(getItem(id));
  };

  const updateCategory = (updatedCategory: CategoryData) => {
    updatedCategory.type = "CATEGORY";
    dispatch(updateItem(updatedCategory));
  };

  const deleteCategory = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchCategoryData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchCategoryData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    categoryData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
  };
};
