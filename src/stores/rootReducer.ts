import { combineReducers } from "redux";

import Auth from "./auth/slice";

import Excel from "./excel/slice";

import Client from "./client/slice";

import Phase from "./operations/phase/slice";
// import Produce from "./operations/produce/slice";
import Purchase from "./operations/purchase/slice";

import Product from "./categories/product/slice";
import ProductGroup from "./categories/product_group/slice";
import Category from "./categories/category/slice";
import ProductType from "./categories/product_type/slice";
import Length from "./categories/length/slice";
import HairTone from "./categories/hair_tone/slice";
import HairQuality from "./categories/hair_quality/slice";
import HairType from "./categories/hair_type/slice";
import Unit from "./categories/unit/slice";
import Warehouse from "./categories/warehouse/slice";
import Customer from "./categories/customer/slice";
import Supplier from "./categories/supplier/slice";

import Employee from "./employee/slice";
import PermissionGroup from "./permission_group/slice";

const rootReducer = combineReducers({
  Auth,

  Excel,

  Client,

  // TODO: Operations
  Phase,
  // Produce,
  Purchase,

  // TODO: Categories
  Product,
  ProductGroup,
  Category,
  ProductType,
  Length,
  HairTone,
  HairQuality,
  HairType,
  Unit,
  Warehouse,
  Customer,
  Supplier,

  // TODO: Employee
  Employee,
  PermissionGroup,
});
export default rootReducer;
