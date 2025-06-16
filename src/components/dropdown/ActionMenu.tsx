import React from "react";
import { Dropdown, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { icons } from "../../assets/icons";

interface DropdownActionProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onReconciliation?: () => void;

  isSelected?: boolean;
}

const DropdownAction: React.FC<DropdownActionProps> = ({
  onEdit,
  onDelete,
  onReconciliation,

  isSelected = false,
}) => {
  const items = [
    onEdit && {
      label: "Sửa",
      key: "1",
      icon: (
        <img
          src={icons.pencilEditWhite}
          alt="Edit"
          className="p-2 bg-blue-500 rounded-md"
        />
      ),
      onClick: onEdit, // Assign the onEdit function
    },
    onDelete && {
      label: "Xóa",
      key: "2",
      icon: (
        <img
          src={icons.deleteOrderWhite}
          alt="Delete"
          className="p-2 bg-red-500 rounded-md"
        />
      ),
      onClick: onDelete, // Assign the onDelete function
    },
    onReconciliation && {
      label: "Đối chiếu công nợ",
      key: "3",
      icon: (
        <img
          src={icons.alignBottomWhite}
          alt="Reconciliation"
          className="p-1 bg-green-500 rounded-md"
        />
      ),
      onClick: onReconciliation, // Assign the onReconciliation function
    },
  ].filter((item) => item !== undefined);

  return (
    <Dropdown
      menu={{
        items: items.map((item) => ({
          ...item,
          onClick: item.onClick, // Ensure the onClick is assigned
        })),
      }}
      placement="bottomRight"
      arrow
      trigger={["click"]}
    >
      <Button type="text">
        <MoreOutlined className={isSelected ? "text-white" : ""} />
      </Button>
    </Dropdown>
  );
};

export default DropdownAction;
