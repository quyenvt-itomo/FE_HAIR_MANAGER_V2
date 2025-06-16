import * as EmployeeActions from "./slice";
import { apiEndpoint } from "../../constants/ApiEndpoint";
import { createBaseSaga } from "../createBaseSaga";
import { EmployeeData, EmployeeQuery, EmployeeResponse } from "../../models/employee";

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
} = EmployeeActions;

export const EmployeeSaga = createBaseSaga<EmployeeData, EmployeeQuery>({
  name: "employee",
  api: apiEndpoint.employee.base,
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
