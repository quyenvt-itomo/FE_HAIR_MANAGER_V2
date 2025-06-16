import { Avatar, Tag, Tooltip } from "antd";
import TableColumnConfig, {
  ObjectTableProps,
} from "../../../../../components/table/TableColumnConfig";
import { HOST_URL } from "../../../../../constants/ApiEndpoint";
import formatMoney from "../../../../../utils/formatMoney";
import { formatWeight } from "../../../../../utils/formatWeight";

const ProductTable: React.FC<ObjectTableProps> = ({
  dataSource,
  onApprove,
  ...rest
}) => {
  const columns: any = [
    {
      title: "Mã hàng",
      dataIndex: "code",
      key: "code",
      width: 200,
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Nhóm hàng",
      dataIndex: ["category", "name"],
      key: "category",
      width: 150,
    },
    {
      title: "Đơn vị",
      dataIndex: ["unit", "name"],
      key: "unit",
      width: 100,
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "right",
      render: (value: number) => (value ? formatMoney(value) : ""),
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      width: 200,
    },
    {
      title: "Kho mặc định",
      dataIndex: ["warehouse", "name"],
      key: "warehouse",
      width: 350,
    },
    {
      title: "Khối lượng tồn",
      dataIndex: "current_balance",
      key: "current_balance",
      width: 150,
      align: "right",
      render: (value: number) => formatWeight(value),
    },
    {
      title: "Độ dài (inch)",
      dataIndex: ["length", "length_inch"],
      key: "length_inch",
      width: 120,
      align: "right",
      render: (text: number) => <span>{text ? text.toFixed(2) : ""}</span>,
    },
    {
      title: "Độ dài (cm)",
      dataIndex: ["length", "length_cm"],
      key: "length_cm",
      width: 120,
      align: "right",
    },
    {
      title: "Ảnh",
      dataIndex: "pictures",
      key: "pictures",
      width: 150,
      render: (value: string[]) => (
        <div className="flex items-center">
          {value?.length > 0 ? (
            <Avatar.Group
              max={{
                count: 2,
                style: {
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  width: 35,
                  height: 35,
                  borderRadius: "50%", // Hình tròn
                },
                popover: { trigger: "click" },
              }}
              className="!flex !gap-3"
            >
              {value.map((picture, index) => (
                <Avatar
                  src={`${HOST_URL}${picture}`}
                  key={index}
                  alt={`pictures-${index}`}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              ))}
            </Avatar.Group>
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      title: "Màu tóc",
      dataIndex: "hair_color",
      key: "hair_color",
      width: 120,
    },
    {
      title: "Dây màu",
      dataIndex: "string_color",
      key: "string_color",
      width: 120,
    },
    {
      title: "Tông tóc",
      dataIndex: ["hair_tone", "name"],
      key: "hair_tone",
      width: 120,
    },
    {
      title: <span title="Chất lượng (đầu-đuôi)">Chất lượng</span>,
      dataIndex: "quality",
      key: "quality",
      width: 120,
    },
    {
      title: "Chất tóc",
      dataIndex: ["hair_quality", "name"],
      key: "hair_quality",
      width: 120,
    },
    {
      title: "Không cắt đuôi",
      dataIndex: "no_tail_cut",
      key: "no_tail_cut",
      width: 150,
      align: "center",
      render: (value: boolean) => {
        return (
          <Tag color={value ? "green" : "red"} className="m-0">
            {value ? "Có" : "Không"}
          </Tag>
        );
      },
    },
    {
      title: "Kiểu tóc",
      dataIndex: ["hair_type", "name"],
      key: "hair_type",
      width: 120,
    },
    {
      title: "Chi tiết kiểu tóc",
      dataIndex: "hair_type_detail",
      key: "hair_type_detail",
      width: 150,
    },
    {
      title: "Màu chun",
      dataIndex: "rubber_band_color",
      key: "rubber_band_color",
      width: 120,
    },
    {
      title: "Lưu ý",
      width: 300,
      dataIndex: "description",
      key: "description",
      render: (value: string) => (
        <Tooltip title={value}>
          <span className="ellipsis-cell w-full">{value}</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <TableColumnConfig
      columns={columns}
      dataSource={dataSource}
      itemName={"hàng hóa"}
      tableKey="product"
      {...rest}
    />
  );
};

export default ProductTable;
