import { ObjectError } from "../../models/base/error_text";
import { EmployeeData } from "../../models/employee";

const employee: ObjectError<EmployeeData>  = {
  add: {
    email: {
      invalid: "Email không hợp lệ",
    }
  }
};

export default employee;
