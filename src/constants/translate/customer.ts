import { ObjectError } from "../../models/base/error_text";
import { CustomerData } from "../../models/categories/customer";

const customer: ObjectError<CustomerData>  = {
  add: {
    email: {
      invalid: "Email không hợp lệ",
      
    }
  }
};

export default customer;

