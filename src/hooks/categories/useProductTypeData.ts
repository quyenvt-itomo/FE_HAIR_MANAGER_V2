import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { ProductTypeData } from "../../models/categories/attribute";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/product_type/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useProductTypeData = ({
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
    data: productTypeData,
    dataById: productTypeDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.ProductType as BaseState<ProductTypeData>,
    shallowEqual
  );

  const fetchProductTypeData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        size,
        keyword,
        type: "TYPE",
      })
    );
  };

  const addProductType = (newProductType: ProductTypeData) => {
    newProductType.type = "TYPE";
    dispatch(addItem(newProductType));
  };

  const getProductType = (id: number) => {
    dispatch(getItem(id));
  };

  const updateProductType = (updatedProductType: ProductTypeData) => {
    updatedProductType.type = "TYPE";
    dispatch(updateItem(updatedProductType));
  };

  const deleteProductType = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchProductTypeData();
  }, [dispatch, page, size, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchProductTypeData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    productTypeData,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addProductType,
    getProductType,
    updateProductType,
    deleteProductType,
  };
};
