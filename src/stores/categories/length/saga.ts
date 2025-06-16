import * as LengthActions from "./slice";
import { apiEndpoint } from "../../../constants/ApiEndpoint";
import { createBaseSaga } from "../../createBaseSaga";
import {
  LengthData,
  LengthQuery,
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
} = LengthActions;

export const LengthSaga = createBaseSaga<LengthData, LengthQuery>({
  name: "length",
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
