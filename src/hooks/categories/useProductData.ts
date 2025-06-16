import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { BaseState } from "../../stores/baseReducers";
import { ProductData } from "../../models/categories/product";
import {
  addItem,
  getAll,
  getItem,
  updateItem,
  deleteItem,
  reset,
} from "../../stores/categories/product/slice";
import { useEffect } from "react";
import { UseDataParams } from "../../models/base/hook_model";

export const useProductData = ({
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
    data: productData,
    dataById: productDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckDelete,
    isCheckUpdate,
  } = useSelector(
    (state: RootState) => state.Product as BaseState<ProductData>,
    shallowEqual
  );

  const fetchProductData = () => {
    if (isLockHook) return;
    dispatch(
      getAll({
        page,
        limit,
        keyword,
      })
    );
  };

  const addProduct = (newProduct: ProductData) => {
    dispatch(addItem(newProduct));
  };

  const getProduct = (id: number) => {
    dispatch(getItem(id));
  };

  const updateProduct = (updatedProduct: ProductData) => {
    dispatch(updateItem(updatedProduct));
  };

  const deleteProduct = (id: number) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    fetchProductData();
  }, [dispatch, page, limit, keyword, sortBy, sortType, isLockHook]);

  useEffect(() => {
    if (!isCheckAdd && !isCheckDelete && !isCheckUpdate) return;

    fetchProductData();
    dispatch(reset());
    onCloseModal?.();
  }, [isCheckAdd, isCheckDelete, isCheckUpdate]);

  return {
    productData,
    productDataById,
    errors,
    loading,
    pagination,
    isCheckAdd,
    isCheckUpdate,
    isCheckDelete,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
  };
};
