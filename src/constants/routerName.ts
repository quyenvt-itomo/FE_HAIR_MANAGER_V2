export const publicRoutesName = {
  login: "/login",
  error_network: "/error-network",
  error_404: "/error-404",
  forgot_password: "/forgot-password",
  confirm_email: "/confirm-email",
  new_password: "/new-password",
  blank: "/blank-page",
};

export const privateRoutesName = {
  // TODO: Báo cáo
  dashboard: "/",
  report: {
    overview: "/report/overview",
    output: "/report/output",
    sales: "/report/sales",
    supplier_debt: "/report/supplier-debt",
    customer_debt: "/report/customer-debt",
    //   debt_customer: "/report/debt/customer/:id",
    inventory: "/report/inventory",
  },

  // TODO: Phát sinh
  operations: {
    // * Sản xuất
    production: {
      list: "/operations/production/list",
      page: "/operations/production/page",

      warehouse_to_leader: {
        add: "/operations/production/warehouse-to-leader/add",
        update: "/operations/production/warehouse-to-leader/update",
        detail: "/operations/production/warehouse-to-leader/detail",
      },

      leader_to_warehouse: {
        add: "/operations/production/leader-to-warehouse/add",
        update: "/operations/production/leader-to-warehouse/update",
        detail: "/operations/production/leader-to-warehouse/detail",
      },

      leader_to_leader: {
        add: "/operations/production/leader-to-leader/add",
        update: "/operations/production/leader-to-leader/update",
        detail: "/operations/production/leader-to-leader/detail",
      },

      leader_to_worker: {
        add: "/operations/production/leader-to-worker/add",
        update: "/operations/production/leader-to-worker/update",
        detail: "/operations/production/leader-to-worker/detail",
      },

      worker_to_leader: {
        add: "/operations/production/worker-to-leader/add",
        update: "/operations/production/worker-to-leader/update",
        detail: "/operations/production/worker-to-leader/detail",
      },
    },

    // * Mua hàng
    purchase: {
      page: "/purchase",
      add: "/purchase/add",
      update: "/purchase/update",
      detail: "/purchase/detail",
    },

    // * Bán hàng
    order: {
      page: "/order",
      add: "/order/add",
      update: "/order/update",
      detail: "/order/detail",
      return: "/order/return",
      rework: "/order/rework",
      delivery: "/order/delivery",
    },
  },

  // TODO: Danh mục
  categories: {
    warehouse: "/categories/warehouse",
    user: "/categories/user",
    customer: "/categories/customer",
    supplier: "/categories/supplier",
    product: {
      page: "/categories/product",
      add: "/categories/product/add",
      update: "/categories/product/update",
      detail: "/categories/product/detail",
    },
  },

  // TODO: Nhân sự
  employee: {
    page: "/employee",
    permission: "/employee/permission",
  },
};
