import { Tooltip } from "antd";
import TableColumnConfig, {
  ObjectTableProps,
} from "../../../../../components/table/TableColumnConfig";

const WarehouseTable: React.FC<ObjectTableProps> = ({
  dataSource,
  onApprove,
  ...rest
}) => {
  const columns: any = [
    {
      title: "Mã kho",
      dataIndex: "code",
      key: "code",
      width: 300,
    },
    {
      title: "Tên kho",
      dataIndex: "name",
      key: "name",
      width: 350,
    },
    {
      title: "Pha",
      dataIndex: ["phase_data", "name"],
      key: "phase_data",
      width: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 120,
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 230,
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: any) => (
        <Tooltip title={record.description}>
          <span className="ellipsis-cell w-full">{record.description}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <TableColumnConfig
      columns={columns}
      dataSource={dataSource}
      itemName={"kho"}
      tableKey="warehouse"
      {...rest}
    />
  );
};

export default WarehouseTable;
