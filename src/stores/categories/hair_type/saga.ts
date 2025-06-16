import * as HairTypeActions from "./slice";
import { apiEndpoint } from "../../../constants/ApiEndpoint";
import { createBaseSaga } from "../../createBaseSaga";
import {
  HairTypeData,
  HairTypeQuery,
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
} = HairTypeActions;

export const HairTypeSaga = createBaseSaga<HairTypeData, HairTypeQuery>({
  name: "hair_type",
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
