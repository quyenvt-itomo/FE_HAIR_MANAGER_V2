import { Avatar, Tag, Tooltip } from "antd";
import TableColumnConfig, {
  ObjectTableProps,
} from "../../../../../components/table/TableColumnConfig";
import { HOST_URL } from "../../../../../constants/ApiEndpoint";
import formatMoney from "../../../../../utils/formatMoney";
import { formatWeight } from "../../../../../utils/formatWeight";
import { formatDateDDMMYYYY } from "../../../../../utils/dateUtils";
import { hasAnyRequiredPermission } from "../../../../../utils/permissionUtils";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../../stores";
import { PermissionMap } from "../../../../../utils/permission_common";
import { useEffect, useState } from "react";

const PurchaseTable: React.FC<ObjectTableProps> = ({
  dataSource,
  onApprove,
  ...rest
}) => {
  const { permissions } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const columns: any[] = [
    {
      title: "Ngày",
      dataIndex: "time_at",
      key: "time_at",
      width: 150,
      align: "center",
      render: (value: string) => formatDateDDMMYYYY(value),
    },
    {
      title: "Mã đơn",
      dataIndex: "bill_number",
      key: "bill_number",
      width: 150,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: ["supplier", "name"],
      key: "supplier",
      width: 270,
    },
    {
      title: "Khối lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      align: "right",
      render: (value: number) => formatWeight(value),
    },
    hasAnyRequiredPermission(permissions, [
      PermissionMap.PURCHASES.VIEW_PURCHASE_PRICE,
    ]) && {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: 150,
      align: "right",
      render: (value: number) => formatMoney(value),
    },
    hasAnyRequiredPermission(permissions, [
      PermissionMap.PURCHASES.VIEW_PURCHASE_PRICE,
    ]) && {
      title: "Thành tiền",
      dataIndex: "money",
      key: "money",
      width: 150,
      align: "right",
      render: (value: number) => formatMoney(value),
    },
    {
      title: "Người mua hàng",
      dataIndex: "employee_purchased",
      key: "employee_purchased",
      render: (value: any) => value?.name,
      width: 270,
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="ellipsis-cell w-60">{text}</span>
        </Tooltip>
      ),
    },
  ].filter(Boolean);

  return (
    <TableColumnConfig
      columns={columns}
      dataSource={dataSource}
      itemName={"phiếu"}
      tableKey="purchase"
      {...rest}
    />
  );
};

export default PurchaseTable;
