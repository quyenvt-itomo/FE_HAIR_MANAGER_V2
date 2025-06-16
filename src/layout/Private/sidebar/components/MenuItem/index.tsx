import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import "./menu.css";
import {
  privateRoutesName,
  publicRoutesName,
} from "../../../../../constants/routerName";
import { icons } from "../../../../../assets/icons";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../../stores";
import { PermissionMap } from "../../../../../utils/permission_common";
import { hasAnyRequiredPermission } from "../../../../../utils/permissionUtils";

type MenuItem = Required<MenuProps>["items"][number];

export function extractPathsFromRouteObject(obj: any): string[] {
  const paths: string[] = [];

  const traverse = (node: any) => {
    if (typeof node === "string") {
      paths.push(node);
    } else if (typeof node === "object" && node !== null) {
      Object.values(node).forEach(traverse);
    }
  };

  traverse(obj);
  return paths;
}

const isActivePath = (paths: string | string[]): boolean => {
  const currentPath = window.location.pathname;

  if (paths === privateRoutesName.dashboard && currentPath !== paths)
    return false;

  // Nếu paths là mảng, kiểm tra tất cả các đường link trong mảng
  if (Array.isArray(paths)) {
    return paths.some((path) => currentPath.includes(path));
  }

  // Nếu paths chỉ là một chuỗi, kiểm tra trực tiếp
  return currentPath.includes(paths);
};

// Sidebar menu
export const SideBarMenuItems = (): MenuItem[] => {
  const { permissions } = useSelector(
    (state: RootState) => ({
      permissions: state.Client.permissions,
    }),
    shallowEqual
  );

  const menuItems: MenuItem[] = [
    // Báo Cáo
    ...[
      {
        key: "report",
        label: <div>Báo cáo</div>,
        icon: (
          <img
            src={
              isActivePath(
                extractPathsFromRouteObject(privateRoutesName.report)
              ) || isActivePath(privateRoutesName.dashboard)
                ? icons.dashboardActive
                : icons.dashboard
            }
            alt="Report"
          />
        ),
        children: [
          {
            key: privateRoutesName.dashboard,
            label: <Link to={privateRoutesName.dashboard}>Tổng quan</Link>,
            className: isActivePath(privateRoutesName.dashboard)
              ? "menu-item-active"
              : "",
          },
          ...(hasAnyRequiredPermission(permissions, [
            PermissionMap.REPORT.VIEW_DASHBOARD,
          ])
            ? [
                {
                  key: privateRoutesName.report.output,
                  label: (
                    <Link to={privateRoutesName.report.output}>Sản lượng</Link>
                  ),
                },
              ]
            : []),
          ...(hasAnyRequiredPermission(permissions, [
            PermissionMap.REPORT.VIEW_DASHBOARD,
          ])
            ? [
                {
                  key: privateRoutesName.report.sales,
                  label: (
                    <Link to={privateRoutesName.report.sales}>Kinh doanh</Link>
                  ),
                },
              ]
            : []),
          ...(hasAnyRequiredPermission(permissions, [
            PermissionMap.REPORT.VIEW_DASHBOARD,
          ])
            ? [
                {
                  key: privateRoutesName.report.customer_debt,
                  label: (
                    <Link to={privateRoutesName.report.customer_debt}>
                      Công nợ khách hàng
                    </Link>
                  ),
                },
              ]
            : []),
          ...(hasAnyRequiredPermission(permissions, [
            PermissionMap.REPORT.VIEW_DASHBOARD,
          ])
            ? [
                {
                  key: privateRoutesName.report.supplier_debt,
                  label: (
                    <Link to={privateRoutesName.report.supplier_debt}>
                      Công nợ nhà cung cấp
                    </Link>
                  ),
                },
              ]
            : []),
          ...(hasAnyRequiredPermission(permissions, [
            PermissionMap.REPORT.VIEW_DASHBOARD,
          ])
            ? [
                {
                  key: privateRoutesName.report.inventory,
                  label: (
                    <Link to={privateRoutesName.report.inventory}>Tồn kho</Link>
                  ),
                },
              ]
            : []),
        ],
      },
    ],

    // Phát sinh
    ...(hasAnyRequiredPermission(permissions, [
      PermissionMap.PURCHASES.VIEW_PURCHASES,
      PermissionMap.CUSTOMER_ORDERS.VIEW_CUSTOMER_ORDERS,
      PermissionMap.MANUFACTURING.VIEW_MANUFACTURING,
    ])
      ? [
          {
            key: "operations",
            label: <div>Sản xuất</div>,
            icon: (
              <img
                src={
                  isActivePath(
                    extractPathsFromRouteObject(privateRoutesName.operations)
                  )
                    ? icons.productionActive
                    : icons.production
                }
                alt="production"
              />
            ),
            children: [
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.MANUFACTURING.VIEW_MANUFACTURING,
              ])
                ? [
                    {
                      key: privateRoutesName.operations.production.list,
                      label: (
                        <Link to={privateRoutesName.operations.production.list}>
                          Công đoạn sản xuất
                        </Link>
                      ),
                      className: isActivePath(
                        extractPathsFromRouteObject(
                          privateRoutesName.operations.production
                        )
                      )
                        ? "menu-item-active"
                        : "",
                    },
                  ]
                : []),
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.PURCHASES.VIEW_PURCHASES,
              ])
                ? [
                    {
                      key: privateRoutesName.operations.purchase.page,
                      label: (
                        <Link to={privateRoutesName.operations.purchase.page}>
                          Mua hàng
                        </Link>
                      ),
                      className: isActivePath(
                        extractPathsFromRouteObject(
                          privateRoutesName.operations.purchase
                        )
                      )
                        ? "menu-item-active"
                        : "",
                    },
                  ]
                : []),
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.CUSTOMER_ORDERS.VIEW_CUSTOMER_ORDERS,
              ])
                ? [
                    {
                      key: privateRoutesName.operations.order.page,
                      label: (
                        <Link to={privateRoutesName.operations.order.page}>
                          Bán hàng
                        </Link>
                      ),
                      className: isActivePath(
                        extractPathsFromRouteObject(
                          privateRoutesName.operations.order
                        )
                      )
                        ? "menu-item-active"
                        : "",
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),

    // Danh Mục
    ...(hasAnyRequiredPermission(permissions, [
      PermissionMap.PRODUCT.VIEW_PRODUCT,
      PermissionMap.WAREHOUSES.VIEW_WAREHOUSES,
      PermissionMap.CUSTOMERS.VIEW_CUSTOMERS,
      PermissionMap.SUPPLIERS.VIEW_SUPPLIERS,
      PermissionMap.PRODUCTION_STAGES.VIEW_PRODUCTION_STAGES,
    ])
      ? [
          {
            key: "categories",
            label: <div>Danh mục</div>,
            icon: (
              <img
                src={
                  isActivePath(
                    extractPathsFromRouteObject(privateRoutesName.categories)
                  )
                    ? icons.categoriesActive
                    : icons.categories
                }
                alt={"categories"}
              />
            ),
            children: [
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.PRODUCT.VIEW_PRODUCT,
              ])
                ? [
                    {
                      key: privateRoutesName.categories.product.page,
                      label: (
                        <Link to={privateRoutesName.categories.product.page}>
                          Vật tư, hàng hóa
                        </Link>
                      ),
                      className: isActivePath(
                        extractPathsFromRouteObject(
                          privateRoutesName.categories.product
                        )
                      )
                        ? "menu-item-active"
                        : "",
                    },
                  ]
                : []),
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.WAREHOUSES.VIEW_WAREHOUSES,
              ])
                ? [
                    {
                      key: privateRoutesName.categories.warehouse,
                      label: (
                        <Link to={privateRoutesName.categories.warehouse}>
                          Kho
                        </Link>
                      ),
                    },
                  ]
                : []),
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.CUSTOMERS.VIEW_CUSTOMERS,
              ])
                ? [
                    {
                      key: privateRoutesName.categories.customer,
                      label: (
                        <Link to={privateRoutesName.categories.customer}>
                          Khách hàng
                        </Link>
                      ),
                    },
                  ]
                : []),
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.SUPPLIERS.VIEW_SUPPLIERS,
              ])
                ? [
                    {
                      key: privateRoutesName.categories.supplier,
                      label: (
                        <Link to={privateRoutesName.categories.supplier}>
                          Nhà cung cấp
                        </Link>
                      ),
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),

    // Nhân Sự
    ...(hasAnyRequiredPermission(permissions, [
      PermissionMap.PERSONNEL.VIEW_PERSONNEL,
      PermissionMap.PERMISSION_GROUP.VIEW_PERMISSION_GROUP,
    ])
      ? [
          {
            key: "employee",
            label: <div>Nhân sự</div>,
            icon: (
              <img
                src={
                  isActivePath(
                    extractPathsFromRouteObject(privateRoutesName.employee)
                  )
                    ? icons.employeeActive
                    : icons.employee
                }
                alt="employee"
              />
            ),
            children: [
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.PERSONNEL.VIEW_PERSONNEL,
              ])
                ? [
                    {
                      key: privateRoutesName.employee.page,
                      label: (
                        <Link to={privateRoutesName.employee.page}>
                          Danh sách nhân sự
                        </Link>
                      ),
                    },
                  ]
                : []),
              ...(hasAnyRequiredPermission(permissions, [
                PermissionMap.PERMISSION_GROUP.VIEW_PERMISSION_GROUP,
              ])
                ? [
                    {
                      key: privateRoutesName.employee.permission,
                      label: (
                        <Link to={privateRoutesName.employee.permission}>
                          Quyền thao tác
                        </Link>
                      ),
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),
  ];

  return menuItems;
};

export const sideBarMenuItem = () => {
  return SideBarMenuItems();
};
