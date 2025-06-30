import { Avatar, Tag, Tooltip } from "antd";
import TableColumnConfig, {
  ObjectTableProps,
} from "../../../../../components/table/TableColumnConfig";
import { HOST_URL } from "../../../../../constants/ApiEndpoint";
import formatMoney from "../../../../../utils/formatMoney";
import formatWeight from "../../../../../utils/formatWeight";
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
  const [data, setData] = useState<any[]>([]);

  const { permissions } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  useEffect(() => {
    const updateData = dataSource.map((item: any) => ({
      ...item,
      details: item.details,
    }));
    setData(updateData);
  }, [dataSource]);

  const columns: any[] = [
    {
      title: "Ngày",
      dataIndex: "timeAt",
      key: "timeAt",
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
      dataIndex: "totalQuantity",
      key: "totalQuantity",
      width: 120,
      align: "right",
      render: (value: number) => formatWeight(value),
    },
    hasAnyRequiredPermission(permissions, [
      PermissionMap.PURCHASES.VIEW_PURCHASE_PRICE,
    ]) && {
      title: "Tổng số tiền",
      dataIndex: "totalMoney",
      key: "totalMoney",
      width: 150,
      align: "right",
      render: (value: number) => formatMoney(value), // Thêm ký hiệu tiền Việt Nam (₫)
    },
    {
      title: "Người mua hàng",
      dataIndex: "employee",
      key: "employee",
      render: (value: any) => value?.full_name,
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

  const detailTableColumns: any = [
    {
      title: "Mã hàng",
      dataIndex: ["product", "code"],
      key: "code",
      width: 200,
    },
    {
      title: "Tên hàng",
      dataIndex: ["product", "name"],
      key: "name",
      width: 300,
    },
    {
      title: "Khối lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      width: 120,
      render: (value: number) => formatWeight(value),
    },
    hasAnyRequiredPermission(permissions, [
      PermissionMap.PURCHASES.VIEW_PURCHASE_PRICE,
    ]) && {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      className: "text-right",
      align: "right",
      width: 150,
      render: (value: number) => formatMoney(value),
    },
    hasAnyRequiredPermission(permissions, [
      PermissionMap.PURCHASES.VIEW_PURCHASE_PRICE,
    ]) && {
      title: "Thành tiền",
      dataIndex: "money",
      key: "money",
      align: "right",
      width: 150,
      render: (value: number) => formatMoney(value),
    },
    {
      title: "Màu sắc",
      dataIndex: ["product", "hairColor"],
      key: "hairColor",
      width: 130,
    },
    {
      title: "Kích thước (cm)",
      dataIndex: ["product", "length", "name"],
      key: "length",
      width: 150,
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <Tooltip title={text}>
          <span className="ellipsis-cell w-full ">{text}</span>
        </Tooltip>
      ),
    },
  ].filter(Boolean);

  return (
    <TableColumnConfig
      columns={columns}
      detailTableColumns={detailTableColumns}
      dataSource={data}
      itemName={"phiếu"}
      tableKey="purchase"
      {...rest}
    />
  );
};

export default PurchaseTable;
