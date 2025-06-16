import * as PhaseActions from "./slice";
import { apiEndpoint } from "../../../constants/ApiEndpoint";
import { createBaseSaga } from "../../createBaseSaga";
import { PhaseData, PhaseQuery } from "../../../models/operations/phase";

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
} = PhaseActions;

export const PhaseSaga = createBaseSaga<PhaseData, PhaseQuery>({
  name: "phase",
  api: apiEndpoint.phase.base,
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
