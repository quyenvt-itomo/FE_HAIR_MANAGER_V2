export const BASE_URL = import.meta.env.VITE_BASE_HOST_URL;
export const HOST_URL = BASE_URL.replace(/\/api\/v1\/?$/, "/");
export const FE_BASE_URL = import.meta.env.VITE_BASE_FRONTEND_URL;

export const apiEndpoint = {
  // uploads
  uploads: "/uploads",

  // auth
  auth: {
    login: `auth/login`,
    logout: `auth/logout`,
    data_info: "auth/info",
    update_data_info: "auth/update-info",
    change_password: "",
  },

  // excel
  excel: {
    template: "/excel/template",
    import: "/excel/import",
    export: "/excel",
  },

  // TODO: Operations
  // phase
  phase: {
    base: "phase",
  },

  // produce
  produce: {
    base: "produce",
  },

  // produce_consignment
  produce_consignment: {
    base: "produce/consignment",
  },

  // purchase
  purchase: {
    base: "purchase",
  },

  // TODO: Categories
  // product
  product: {
    base: "product",
    approve: "product/approve",
  },
  // product_group
  product_group: {
    base: "product_group",
  },
  // attribute
  attribute: {
    base: "attribute",
  },

  // warehouse
  warehouse: {
    base: "warehouse",
  },

  // customer
  customer: {
    base: "customer",
  },

  // supplier
  supplier: {
    base: "supplier",
  },

  // user
  user: {
    base: "user",
    create: "auth/create",
  },

  // TODO: Employee
  // employee
  employee: {
    base: "user",
    create: "auth/create",
  },

  // permission
  permission: {
    base: "permission",
    group: "permission-groups",
    set_perm: "permission/set-perm",
  },
  // permission_group
  permission_group: {
    base: "permission-group",
  },
};
