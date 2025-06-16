import * as ProductGroupActions from "./slice";
import { apiEndpoint } from "../../../constants/ApiEndpoint";
import { createBaseSaga } from "../../createBaseSaga";
import {
  ProductGroupData,
  ProductGroupQuery,
} from "../../../models/categories/product_group";

const {
  getAllSuccess,
  getAllFailure,
  getItemSuccess,
  getItemFailure,
  addItemSuccess,
  addItemFailure,
  updateItemSuccess,
  updateItemFailure,
  deleteItemSuccess,
  deleteItemFailure,
} = ProductGroupActions;

export const ProductGroupSaga = createBaseSaga<ProductGroupData, ProductGroupQuery>({
  name: "product_group",
  api: apiEndpoint.product_group.base,
  actions: {
    getAllSuccess,
    getAllFailure,
    getItemSuccess,
    getItemFailure,
    addItemSuccess,
    addItemFailure,
    updateItemSuccess,
    updateItemFailure,
    deleteItemSuccess,
    deleteItemFailure,
  }
});
