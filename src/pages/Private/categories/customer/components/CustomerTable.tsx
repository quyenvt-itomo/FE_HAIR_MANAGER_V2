import { Tooltip } from "antd";
import TableColumnConfig, {
  ObjectTableProps,
} from "../../../../../components/table/TableColumnConfig";
import UserImage from "../../../../../components/image/UserImage";

const CustomerTable: React.FC<ObjectTableProps> = ({
  dataSource,
  onApprove,
  ...rest
}) => {
  const columns: any = [
    {
      title: "Mã khách hàng",
      dataIndex: "code",
      key: "code",
      width: 150,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      width: 350,
      render: (name: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="w-10 h-10 rounded-full overflow-hidden grid place-items-center">
            <UserImage src={record.avatar} height={30} width={30} />
          </div>
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: "Ký hiệu",
      dataIndex: "symbol",
      key: "symbol",
      width: 150,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phoneNumber",
      width: 120,
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 350,
    },
    {
      title: "Dư nợ bắt đầu",
      dataIndex: "initial_debt",
      key: "initialDebt",
      align: "right",
      width: 200,
      render: (value: number) => {
        return value
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value)
          : "0 đ";
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: any) => (
        <Tooltip title={record.description}>
          <span className="ellipsis-cell w-[350px]">{record.description}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <TableColumnConfig
      columns={columns}
      dataSource={dataSource}
      itemName={"khách hàng"}
      tableKey="customer"
      {...rest}
    />
  );
};

export default CustomerTable;
