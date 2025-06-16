import { createSlice } from "@reduxjs/toolkit";

import {
  EmployeeData,
  EmployeeQuery,
  EmployeeResponse,
} from "../../models/employee";
import { EMPLOYEE_MESSAGES } from "../../constants/message/employee";
import { createBaseInitialState, createBaseReducers } from "../baseReducers";

const initialState = createBaseInitialState<EmployeeData>();

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    ...createBaseReducers<EmployeeData, EmployeeQuery, EmployeeResponse>(
      EMPLOYEE_MESSAGES
    ),
  },
});

export const {
  getAll,
  getAllSuccess,
  getAllFailure,
  getItem,
  getItemSuccess,
  getItemFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  updateItem,
  updateItemSuccess,
  updateItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
  clearMessage,
  reset,
  resetErrors,
} = employeeSlice.actions;

export default employeeSlice.reducer;
