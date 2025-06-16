export const PermissionMap = {
  REPORT: {
    VIEW_DASHBOARD: "VIEW_DASHBOARD",
    VIEW_REPORT_PRICE: "VIEW_REPORT_PRICE",
  },

  PURCHASES: {
    VIEW_PURCHASES: "VIEW_PURCHASE",
    CREATE_PURCHASES: "CREATE_PURCHASE",
    UPDATE_PURCHASES: "UPDATE_PURCHASE",
    DELETE_PURCHASES: "DELETE_PURCHASE",
    VIEW_PURCHASE_PRICE: "VIEW_PURCHASE_PRICE",
  },

  CUSTOMER_ORDERS: {
    VIEW_CUSTOMER_ORDERS: "VIEW_ORDER",
    CREATE_CUSTOMER_ORDERS: "CREATE_ORDER",
    CREATE_ORDER_DELIVERY: "CREATE_ORDER_DELIVERY",
    CREATE_ORDER_RETURN: "CREATE_ORDER_RETURN",
    UPDATE_CUSTOMER_ORDERS: "UPDATE_ORDER",
    UPDATE_ORDER_DELIVERY: "UPDATE_ORDER_DELIVERY",
    UPDATE_ORDER_RETURN: "UPDATE_ORDER_RETURN",
    DELETE_CUSTOMER_ORDERS: "DELETE_ORDER",
    DELETE_ORDER_DELIVERY: "DELETE_ORDER_DELIVERY",
    DELETE_ORDER_RETURN: "DELETE_ORDER_RETURN",
    VIEW_ORDER_PRICE: "VIEW_ORDER_PRICE",
  },

  MANUFACTURING: {
    VIEW_MANUFACTURING: "VIEW_CONSIGNMENT",
    CREATE_MANUFACTURING: "CREATE_CONSIGNMENT",
    CREATE_CONSIGNMENT_L_TO_L: "CREATE_CONSIGNMENT_L_TO_L",
    CREATE_CONSIGNMENT_L_TO_WO: "CREATE_CONSIGNMENT_L_TO_WO",
    CREATE_CONSIGNMENT_WO_TO_L: "CREATE_CONSIGNMENT_WO_TO_L",
    CREATE_CONSIGNMENT_L_TO_WH: "CREATE_CONSIGNMENT_L_TO_WH",
    UPDATE_MANUFACTURING: "UPDATE_CONSIGNMENT",
    UPDATE_CONSIGNMENT_L_TO_L: "UPDATE_CONSIGNMENT_L_TO_L",
    UPDATE_CONSIGNMENT_L_TO_WO: "UPDATE_CONSIGNMENT_L_TO_WO",
    UPDATE_CONSIGNMENT_WO_TO_L: "UPDATE_CONSIGNMENT_WO_TO_L",
    UPDATE_CONSIGNMENT_L_TO_WH: "UPDATE_CONSIGNMENT_L_TO_WH",
    DELETE_MANUFACTURING: "DELETE_CONSIGNMENT",
    DELETE_CONSIGNMENT_L_TO_L: "DELETE_CONSIGNMENT_L_TO_L",
    DELETE_CONSIGNMENT_L_TO_WO: "DELETE_CONSIGNMENT_L_TO_WO",
    DELETE_CONSIGNMENT_WO_TO_L: "DELETE_CONSIGNMENT_WO_TO_L",
    DELETE_CONSIGNMENT_L_TO_WH: "DELETE_CONSIGNMENT_L_TO_WH",
    CONFIRM_CONSIGNMENT_DETAIL: "CONFIRM_CONSIGNMENT_DETAIL",
    FINISH_CONSIGNMENT: "FINISH_CONSIGNMENT",

  },
  PRODUCT: {
    VIEW_PRODUCT: "VIEW_PRODUCT",
    CREATE_PRODUCT: "CREATE_PRODUCT",
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
    DELETE_PRODUCT: "DELETE_PRODUCT",
  },
  WAREHOUSES: {
    VIEW_WAREHOUSES: "VIEW_WAREHOUSE",
    CREATE_WAREHOUSES: "CREATE_WAREHOUSE",
    UPDATE_WAREHOUSES: "UPDATE_WAREHOUSE",
    DELETE_WAREHOUSES: "DELETE_WAREHOUSE",
  },
  CUSTOMERS: {
    VIEW_CUSTOMERS: "VIEW_CUSTOMER",
    CREATE_CUSTOMERS: "CREATE_CUSTOMER",
    UPDATE_CUSTOMERS: "UPDATE_CUSTOMER",
    DELETE_CUSTOMERS: "DELETE_CUSTOMER",
  },
  SUPPLIERS: {
    VIEW_SUPPLIERS: "VIEW_SUPPLIER",
    CREATE_SUPPLIERS: "CREATE_SUPPLIER",
    UPDATE_SUPPLIERS: "UPDATE_SUPPLIER",
    DELETE_SUPPLIERS: "DELETE_SUPPLIER",
  },
  PRODUCTION_STAGES: {
    VIEW_PRODUCTION_STAGES: "VIEW_PRODUCTION_STAGE",
    CREATE_PRODUCTION_STAGES: "CREATE_PRODUCTION_STAGE",
    UPDATE_PRODUCTION_STAGES: "UPDATE_PRODUCTION_STAGE",
    DELETE_PRODUCTION_STAGES: "DELETE_PRODUCTION_STAGE",
  },

  PERSONNEL: {
    VIEW_PERSONNEL: "VIEW_EMPLOYEE",
    CREATE_PERSONNEL: "CREATE_EMPLOYEE",
    UPDATE_PERSONNEL: "UPDATE_EMPLOYEE",
    DELETE_PERSONNEL: "DELETE_EMPLOYEE",
  },

  PERMISSION_GROUP: {
    VIEW_PERMISSION_GROUP: "VIEW_PERMISSION",
    CREATE_PERMISSION_GROUP: "CREATE_PERMISSION",
    UPDATE_PERMISSION_GROUP: "UPDATE_PERMISSION",
    DELETE_PERMISSION_GROUP: "DELETE_PERMISSION",
  },
};

export const translatePermission = (permission: string) => {
  const translations: { [key: string]: string } = {
    // Báo cáo
    REPORT: "Báo cáo",
    VIEW_OVERVIEW: "Xem tổng quan",
    VIEW_OUTPUT: "Xem sản lượng",
    VIEW_SALES: "Xem doanh số",
    VIEW_DEBT: "Xem công nợ",
    VIEW_REPORT: "Xem báo cáo",
    VIEW_REPORT_PRICE: "Xem giá",
    DASHBOARD: "Bảng điều khiển",
    VIEW_DASHBOARD: "Xem bảng điều khiển",

    // Mua hàng
    PURCHASES: "Mua hàng",
    VIEW_PURCHASES: "Xem mua hàng",
    CREATE_PURCHASES: "Tạo mua hàng",
    UPDATE_PURCHASES: "Cập nhật mua hàng",
    DELETE_PURCHASES: "Xóa mua hàng",
    VIEW_PURCHASE_PRICE: "Xem giá",

    // Đơn hàng khách
    CUSTOMER_ORDERS: "Đơn hàng khách",
    VIEW_CUSTOMER_ORDERS: "Xem đơn hàng khách",
    CREATE_CUSTOMER_ORDERS: "Tạo đơn hàng khách",
    UPDATE_CUSTOMER_ORDERS: "Cập nhật đơn hàng khách",
    DELETE_CUSTOMER_ORDERS: "Xóa đơn hàng khách",

    // Sản xuất - Tồn kho
    STOCK_PRODUCTION: "Sản xuất - Tồn kho",
    VIEW_STOCK_PRODUCTION: "Xem tồn kho sản xuất",
    CREATE_STOCK_PRODUCTION: "Tạo tồn kho sản xuất",
    UPDATE_STOCK_PRODUCTION: "Cập nhật tồn kho sản xuất",
    DELETE_STOCK_PRODUCTION: "Xóa tồn kho sản xuất",

    // Sản xuất
    MANUFACTURING: "Sản xuất",
    VIEW_MANUFACTURING: "Xem sản xuất",
    CREATE_MANUFACTURING: "Tạo sản xuất",
    UPDATE_MANUFACTURING: "Cập nhật sản xuất",
    DELETE_MANUFACTURING: "Xóa sản xuất",

    // Hàng hóa - Vật liệu
    MATERIALS_GOODS: "Vật liệu - Hàng hóa",
    VIEW_MATERIALS_GOODS: "Xem vật liệu/hàng hóa",
    CREATE_MATERIALS_GOODS: "Tạo vật liệu/hàng hóa",
    UPDATE_MATERIALS_GOODS: "Cập nhật vật liệu/hàng hóa",
    DELETE_MATERIALS_GOODS: "Xóa vật liệu/hàng hóa",

    // Kho bãi
    WAREHOUSES: "Kho bãi",
    VIEW_WAREHOUSES: "Xem kho bãi",
    CREATE_WAREHOUSES: "Tạo kho bãi",
    UPDATE_WAREHOUSES: "Cập nhật kho bãi",
    DELETE_WAREHOUSES: "Xóa kho bãi",

    // Khách hàng
    CUSTOMERS: "Khách hàng",
    VIEW_CUSTOMERS: "Xem khách hàng",
    CREATE_CUSTOMERS: "Tạo khách hàng",
    UPDATE_CUSTOMERS: "Cập nhật khách hàng",
    DELETE_CUSTOMERS: "Xóa khách hàng",

    // Nhà cung cấp
    SUPPLIERS: "Nhà cung cấp",
    VIEW_SUPPLIERS: "Xem nhà cung cấp",
    CREATE_SUPPLIERS: "Tạo nhà cung cấp",
    UPDATE_SUPPLIERS: "Cập nhật nhà cung cấp",
    DELETE_SUPPLIERS: "Xóa nhà cung cấp",

    // Công đoạn sản xuất
    PRODUCTION_STAGES: "Công đoạn sản xuất",
    VIEW_PRODUCTION_STAGES: "Xem công đoạn sản xuất",
    CREATE_PRODUCTION_STAGES: "Tạo công đoạn sản xuất",
    UPDATE_PRODUCTION_STAGES: "Cập nhật công đoạn sản xuất",
    DELETE_PRODUCTION_STAGES: "Xóa công đoạn sản xuất",

    // Nhân sự
    PERSONNEL: "Nhân sự",
    VIEW_PERSONNEL: "Xem nhân sự",
    CREATE_PERSONNEL: "Tạo nhân sự",
    UPDATE_PERSONNEL: "Cập nhật nhân sự",
    DELETE_PERSONNEL: "Xóa nhân sự",

    // Nhóm quyền
    PERMISSION: "Phân quyền",
    VIEW_PERMISSION: "Xem quyền",
    UPDATE_PERMISSION: "Cập nhật quyền",
    CREATE_PERMISSION: "Tạo quyền",
    DELETE_PERMISSION: "Xóa quyền",

    // Sự kiện
    EVENT: "Sự kiện",
    VIEW_EVENT: "Xem sự kiện",
    CREATE_EVENT: "Tạo sự kiện",
    UPDATE_EVENT: "Cập nhật sự kiện",
    DELETE_EVENT: "Xóa sự kiện",

    // Nhóm quyền
    CUSTOMER: "Khách hàng",
    VIEW_CUSTOMER: "Xem khách hàng",
    CREATE_CUSTOMER: "Tạo khách hàng",
    UPDATE_CUSTOMER: "Cập nhật  khách hàng",
    DELETE_CUSTOMER: "Xóa khách hàng",

    // Nhân viên
    EMPLOYEE: "Nhân viên",
    VIEW_EMPLOYEE: "Xem nhân viên",
    CREATE_EMPLOYEE: "Tạo nhân viên",
    UPDATE_EMPLOYEE: "Cập nhật nhân viên",
    DELETE_EMPLOYEE: "Xóa nhân viên",

    // Đơn hàng
    ORDER: "Đơn hàng",
    VIEW_ORDER: "Xem đơn hàng",
    CREATE_ORDER: "Tạo đơn hàng",
    UPDATE_ORDER: "Cập nhật đơn hàng",
    DELETE_ORDER: "Xóa đơn hàng",
    CREATE_ORDER_DELIVERY: "Tạo đơn hàng giao hàng",
    CREATE_ORDER_RETURN: "Tạo đơn hàng trả hàng",
    UPDATE_ORDER_DELIVERY: "Cập nhật đơn hàng giao hàng",
    UPDATE_ORDER_RETURN: "Cập nhật đơn hàng trả hàng",
    DELETE_ORDER_DELIVERY: "Xóa đơn hàng giao hàng",
    DELETE_ORDER_RETURN: "Xóa đơn hàng trả hàng",
    VIEW_ORDER_PRICE: "Xem giá",

    PRODUCE: "Sản xuất",
    VIEW_CONSIGNMENT: "Xem công đoạn sản xuất",
    CREATE_CONSIGNMENT: "Tạo công đoạn sản xuất",
    CREATE_CONSIGNMENT_L_TO_WO: "Tạo công đoạn sản xuất từ tổ trưởng đến thợ",
    CREATE_CONSIGNMENT_WO_TO_L: "Tạo công đoạn sản xuất từ thợ đến tổ trưởng",
    CREATE_CONSIGNMENT_L_TO_WH:
      "Tạo công đoạn sản xuất từ tổ trưởng đến kho hàng",
      CREATE_CONSIGNMENT_L_TO_L:
        "Tạo công đoạn sản xuất từ tổ trưởng đến tổ trưởng",
    UPDATE_CONSIGNMENT: "Cập nhật công đoạn sản xuất",
    UPDATE_CONSIGNMENT_L_TO_WO:
      "Cập nhật công đoạn sản xuất từ tổ trưởng đến thợ",
    UPDATE_CONSIGNMENT_WO_TO_L:
      "Cập nhật công đoạn sản xuất từ thợ đến tổ trưởng",
    UPDATE_CONSIGNMENT_L_TO_WH:
      "Cập nhật công đoạn sản xuất từ tổ trưởng đến kho hàng",
      UPDATE_CONSIGNMENT_L_TO_L:
        "Cập nhật công đoạn sản xuất từ tổ trưởng đến tổ trưởng",
    DELETE_CONSIGNMENT: "Xóa công đoạn sản xuất",
    DELETE_CONSIGNMENT_L_TO_WO: "Xóa công đoạn sản xuất từ tổ trưởng đến thợ",
    DELETE_CONSIGNMENT_WO_TO_L: "Xóa công đoạn sản xuất từ thợ đến tổ trưởng",
    DELETE_CONSIGNMENT_L_TO_WH:
      "Xóa công đoạn sản xuất từ tổ trưởng đến kho hàng",
      DELETE_CONSIGNMENT_L_TO_L:
        "Xóa công đoạn sản xuất từ tổ trưởng đến tổ trưởng",
    CONFIRM_CONSIGNMENT_DETAIL: "Xác nhận chi tiết công đoạn sản xuất",
    FINISH_CONSIGNMENT: "Hoàn thành công đoạn sản xuất",
    ACCOUNTANT_CONFIRM_CONSIGNMENT: "Xác nhận từ thư ký",
    //
    PRODUCT: "hàng hóa",
    VIEW_PRODUCT: "Xem hàng hóa",
    CREATE_PRODUCT: "Tạo hàng hóa",
    UPDATE_PRODUCT: "Cập nhật hàng hóa",
    DELETE_PRODUCT: "Xóa hàng hóa",

    PURCHASE: "Mua hàng",
    VIEW_PURCHASE: "Xem phiếu mua hàng",
    CREATE_PURCHASE: "Tạo phiếu mua hàng",
    UPDATE_PURCHASE: "Cập nhật phiếu mua hàng",
    DELETE_PURCHASE: "Xóa phiếu mua hàng",

    SUPPLIER: "Nhà cung cấp",
    VIEW_SUPPLIER: "Xem nhà cung cấp",
    CREATE_SUPPLIER: "Tạo nhà cung cấp",
    UPDATE_SUPPLIER: "Cập nhật nhà cung cấp",
    DELETE_SUPPLIER: "Xóa nhà cung cấp",

    WAREHOUSE: "Kho",
    VIEW_WAREHOUSE: "Xem kho",
    CREATE_WAREHOUSE: "Tạo kho",
    UPDATE_WAREHOUSE: "Cập nhật kho",
    DELETE_WAREHOUSE: "Xóa kho",

    ATTRIBUTE: "Thuộc tính",
    VIEW_ATTRIBUTE: "Xem thuộc tính",
    CREATE_ATTRIBUTE: "Tạo thuộc tính",
    UPDATE_ATTRIBUTE: "Cập nhật thuộc tính",
    DELETE_ATTRIBUTE: "Xóa thuộc tính",
  };
  return translations[permission] || permission;
};
