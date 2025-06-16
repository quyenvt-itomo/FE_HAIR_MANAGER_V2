import { all, fork } from "redux-saga/effects";
import { AuthSaga } from "./auth/saga";

import { ExcelSaga } from "./excel/saga";

import { PhaseSaga } from "./operations/phase/saga";
// import { ProduceSaga } from "./operations/produce/saga";
import { PurchaseSaga } from "./operations/purchase/saga";

import { ProductSaga } from "./categories/product/saga";
import { ProductGroupSaga } from "./categories/product_group/saga";
import { CategorySaga } from "./categories/category/saga";
import { ProductTypeSaga } from "./categories/product_type/saga";
import { LengthSaga } from "./categories/length/saga";
import { HairToneSaga } from "./categories/hair_tone/saga";
import { HairQualitySaga } from "./categories/hair_quality/saga";
import { HairTypeSaga } from "./categories/hair_type/saga";
import { UnitSaga } from "./categories/unit/saga";
import { WarehouseSaga } from "./categories/warehouse/saga";
import { CustomerSaga } from "./categories/customer/saga";
import { SupplierSaga } from "./categories/supplier/saga";

import { EmployeeSaga } from "./employee/saga";
import { PermissionGroupSaga } from "./permission_group/saga";

function* rootSaga() {
  yield all([
    fork(AuthSaga),

    fork(ExcelSaga),

    // TODO: Operations
    fork(PhaseSaga),
    // fork(ProduceSaga),
    fork(PurchaseSaga),

    // TODO: Categories
    fork(ProductSaga),
    fork(ProductGroupSaga),
    fork(CategorySaga),
    fork(ProductTypeSaga),
    fork(LengthSaga),
    fork(HairToneSaga),
    fork(HairQualitySaga),
    fork(HairTypeSaga),
    fork(UnitSaga),
    fork(WarehouseSaga),
    fork(CustomerSaga),
    fork(SupplierSaga),

    // TODO: Employee,
    fork(EmployeeSaga),
    fork(PermissionGroupSaga),
  ]);
}

export default rootSaga;
