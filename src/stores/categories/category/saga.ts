import * as CategoryActions from "./slice";
import { apiEndpoint } from "../../../constants/ApiEndpoint";
import { createBaseSaga } from "../../createBaseSaga";
import {
  CategoryData,
  CategoryQuery,
} from "../../../models/categories/attribute";

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
} = CategoryActions;

export const CategorySaga = createBaseSaga<CategoryData, CategoryQuery>({
  name: "category",
  api: apiEndpoint.attribute.base,
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
  },
});
