import { Tag, Tooltip } from "antd";
import UserImage from "../../../../components/image/UserImage";
import HeaderTooltip from "../../../../components/table/HeaderTooltip";
import TableColumnConfig, { ObjectTableProps } from "../../../../components/table/TableColumnConfig";
import { EmployeeData } from "../../../../models/employee";

const EmployeeTable: React.FC<ObjectTableProps> = ({
  dataSource,
  onApprove,
  ...rest
}) => {
  const columns: any = [
    {
      title: <HeaderTooltip title="Mã nhân sự" />,
      dataIndex: "code",
      key: "code",
      width: 120,
    },
    {
      title: <HeaderTooltip title="Tên nhân sự" />,
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (name: string, record: EmployeeData) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden grid place-items-center">
            <UserImage src={record.avatar} height={30} width={30} />
          </div>
          <div className="flex flex-col">
            <Tooltip title={name} className="w-40 truncate">
              {name}
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      className: "text-center",
      width: 120,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 430,
    },
    {
      title: "Quyền trong hệ thống",
      dataIndex: "permission_group",
      key: "permission_group",
      render: (value: any) =>
        value && Array.isArray(value) ? (
          <div className="flex flex-wrap gap-2">
            {value.map((group, index) => (
              <Tag color="default" key={index} className="m-0">
                {group.name}
              </Tag>
            ))}
          </div>
        ) : (
          ""
        ),
      width: 450,
    },
    {
      title: "Chức vụ",
      dataIndex: "is_leader",
      key: "is_leader",
      render: (value: boolean) => (value === true ? "Tổ trưởng" : "Nhân viên"),
      width: 100,
    },
    {
      title: "Tổ quản lý",
      dataIndex: "leader_of_team",
      key: "leader_of_team",
      render: (value: any) =>
        value && Array.isArray(value) ? (
          <div className="flex flex-wrap gap-2">
            {value.map((group, index) => (
              <Tag color="default" key={index} className="mr-0">
                {group.name.replace("CÔNG ĐOẠN", "").trim()}
              </Tag>
            ))}
          </div>
        ) : (
          ""
        ),
      width: 450,
    },
    {
      title: "Trạng thái",
      align: "center",
      dataIndex: "access",
      key: "access",
      render(value: any, record: any) {
        if (!record) {
          return null;
        }

        return record.access === false && record.active === false ? (
          <Tag color="red" className="mr-0">
            Chưa kích hoạt
          </Tag>
        ) : record.access === false && record.active === true ? (
          <Tag color="volcano" className="mr-0">
            Đã khóa
          </Tag>
        ) : (
          <Tag color="green" className="mr-0">
            Đang hoạt động
          </Tag>
        );
      },
      width: 150,
    },
  ];

  return (
    <div
      className="flex flex-col mt-3"
      style={{
        height: "calc(100% - 44px)",
      }}
    >
      <TableColumnConfig
        columns={columns}
        dataSource={dataSource.map((data) => ({
          ...data,
          key: data.id.toString(),
          details: data.details?.map((item: any) => ({
            ...item,
            parent: data,
          })),
        }))}
        itemName={"nhân sự"}
        tableKey="employee"
        {...rest}
      />
    </div>
  );
};

export default EmployeeTable;
