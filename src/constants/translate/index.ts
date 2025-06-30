import auth from "./auth";
import customer from "./customer";
import employee from "./employee";

export const ERROR = {
  auth,

  // TODO: Operations
  phase: {},
  produce: {},
  purchase: {},
  sale: {},
  delivery: {},
  return: {},

  // TODO: Categories
  warehouse: {},
  product: {},
  product_group: {},
  category: {},
  product_type: {},
  length: {},
  hair_tone: {},
  hair_quality: {},
  hair_type: {},
  unit: {},

  customer,
  department: {},
  supplier: {},

  // TODO: Employee
  employee,
  user: {},
  permission: {},
  permission_group: {},

  excel: {},
} as const;
