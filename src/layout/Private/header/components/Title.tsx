import React, { useEffect } from "react";
import { Typography } from "antd";
import { privateRoutesName } from "../../../../constants/routerName";
import { matchPath } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../stores";

const { Title, Text } = Typography;

type RouteKeyProps = {
  [key: string]: {
    path: string;
    title: string;
    subTitle: string;
  };
};

const routeKeysMap: RouteKeyProps = {
  dashboard: {
    path: privateRoutesName.dashboard,
    title: "Báo cáo",
    subTitle: "Báo cáo tổng quan",
  },

  // TODO: Operations
  phase: {
    path: privateRoutesName.operations.production.list,
    title: "Công đoạn sản xuất",
    subTitle: "Danh sách công đoạn sản xuất",
  },
  purchase: {
    path: privateRoutesName.operations.purchase.page,
    title: "Mua hàng",
    subTitle: "Danh sách phiếu mua hàng",
  },
  add_purchase: {
    path: privateRoutesName.operations.purchase.add,
    title: "Tạo phiếu mua hàng",
    subTitle: "Tạo mới phiếu mua hàng",
  },
  update_purchase: {
    path: privateRoutesName.operations.purchase.update,
    title: "Chỉnh sửa phiếu mua hàng",
    subTitle: "Chỉnh sửa thông tin phiếu mua hàng",
  },

  // TODO: Categories
  product: {
    path: privateRoutesName.categories.product.page,
    title: "Vật tư, hàng hóa",
    subTitle: "Danh sách vật tư, hàng hóa",
  },
  add_product: {
    path: privateRoutesName.categories.product.add,
    title: "Vật tư, hàng hóa",
    subTitle: "Thêm mới vật tư, hàng hóa",
  },
  update_product: {
    path: privateRoutesName.categories.product.update,
    title: "Vật tư, hàng hóa",
    subTitle: "Chỉnh sửa thông tin vật tư, hàng hóa",
  },

  warehouse: {
    path: privateRoutesName.categories.warehouse,
    title: "Kho",
    subTitle: "Danh sách kho",
  },

  customer: {
    path: privateRoutesName.categories.customer,
    title: "Khách hàng",
    subTitle: "Danh sách khách hàng",
  },

  supplier: {
    path: privateRoutesName.categories.supplier,
    title: "Nhà cung cấp",
    subTitle: "Danh sách nhà cung cấp",
  },

  // TODO: Employee
  employee: {
    path: privateRoutesName.employee.page,
    title: "Nhân sự",
    subTitle: "Danh sách nhân sự",
  },
};

const CustomTitle: React.FC = () => {
  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const currentUrl = location.pathname;
  const matchedRoute = Object.values(routeKeysMap).find(
    (route) =>
      typeof route.path === "string" && matchPath(route.path, currentUrl)
  );

  useEffect(() => {
    const pageTitle = matchedRoute?.title
      ? `GDT HAIR | ${matchedRoute.title}`
      : "GDT HAIR";
    document.title = pageTitle;
  }, [matchedRoute]);

  return (
    <div
      style={{
        margin: 0,
        height: "100%",
        maxHeight: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Title
        level={5}
        style={{
          fontSize: "1.2rem",
          marginBottom: 0,
          lineHeight: "1.2rem",
          fontWeight: 500,
        }}
      >
        {matchedRoute?.title || ""}
      </Title>
      {!horizontal && (
        <Text
          type="secondary"
          style={{
            fontSize: "0.8rem",
            lineHeight: "0.8rem",
            marginTop: "4px",
          }}
        >
          {matchedRoute?.subTitle || ""}
        </Text>
      )}
    </div>
  );
};

export default CustomTitle;
