import { privateRoutesName, publicRoutesName } from "../constants/routerName";
import { BlankPage } from "../pages/Public/error/BlankPage";
import ErrorNetworkPage from "../pages/Public/error/ErrorNetwork/ErrorNetworkPage";
import NotFoundPage from "../pages/Public/error/NotFound/NotFoundPage";
import ConfirmEmail from "../pages/Public/ForgotPassword/components/ConfirmEmail";
import NewPassword from "../pages/Public/ForgotPassword/components/NewPassword";
import ForgotPasswordPage from "../pages/Public/ForgotPassword/ForgotPassword";
import LoginPage from "../pages/Public/Login/LoginPage";

import DashboardPage from "../pages/Private/dashboard";

import EmployeePage from "../pages/Private/employee";

import UserPage from "../pages/Private/categories/user";
import CustomerPage from "../pages/Private/categories/customer";
import SupplierPage from "../pages/Private/categories/supplier";
import ProductPage from "../pages/Private/categories/product";
import PermissionPage from "../pages/Private/permission/Page";
import AddUpdateProductPage from "../pages/Private/categories/product/AddUpdatePage";
import PhasePage from "../pages/Private/operations/phase/Page";
import WarehousePage from "../pages/Private/categories/warehouse/Page";
import PurchasePage from "../pages/Private/operations/purchase/Page";

// Public Routes
const publicRoutes = [
    { path: publicRoutesName.login, component: LoginPage },
    { path: publicRoutesName.error_404, component: NotFoundPage },
    { path: publicRoutesName.error_network, component: ErrorNetworkPage },
    { path: publicRoutesName.forgot_password, component: ForgotPasswordPage },
    { path: publicRoutesName.confirm_email, component: ConfirmEmail },
    { path: publicRoutesName.new_password, component: NewPassword },
    { path: publicRoutesName.blank, component: BlankPage },
];

// Private Routes
const privateRoutes = [
    { path: "/", component: DashboardPage },

    // TODO: Operations
    {  path: privateRoutesName.operations.production.list, component: PhasePage },
    // purchase
    { path: privateRoutesName.operations.purchase.page, component: PurchasePage },

    // TODO: Categories
    { path: privateRoutesName.categories.product.page, component: ProductPage },
    { path: privateRoutesName.categories.product.add, component: AddUpdateProductPage },
    { path: privateRoutesName.categories.product.update, component: AddUpdateProductPage },

    { path: privateRoutesName.categories.warehouse, component: WarehousePage },

    { path: privateRoutesName.categories.user, component: UserPage },
    { path: privateRoutesName.categories.customer, component: CustomerPage },
    { path: privateRoutesName.categories.supplier, component: SupplierPage },

    // TODO: Employee
    { path: privateRoutesName.employee.page, component: EmployeePage },
    { path: privateRoutesName.employee.permission, component: PermissionPage },
];

export { publicRoutes, privateRoutes };
