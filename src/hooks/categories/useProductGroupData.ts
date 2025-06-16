import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { ProductGroupData } from "../../models/categories/product_group";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/product_group/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useProductGroupData = ({
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
    data: productGroupData,
    dataById: productGroupDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.ProductGroup as BaseState<ProductGroupData>,
    shallowEqual
  );

  const fetchProductGroupData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
      })
    );
  };

  const addProductGroup = (newProductGroup: ProductGroupData) => {
    dispatch(addItem(newProductGroup));
  };

  const getProductGroup = (id: number) => {
    dispatch(getItem(id));
  };

  const updateProductGroup = (updatedProductGroup: ProductGroupData) => {
    dispatch(updateItem(updatedProductGroup));
  };

  const deleteProductGroup = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchProductGroupData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchProductGroupData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    productGroupData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addProductGroup,
    getProductGroup,
    updateProductGroup,
    deleteProductGroup,
  };
};
