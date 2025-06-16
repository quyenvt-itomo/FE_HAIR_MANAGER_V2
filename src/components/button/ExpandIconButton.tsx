import React from "react";
import { COLORS } from "../../constants/UI";
import { icons } from "../../assets/icons";
import { IconArrowDown } from "../icon/ArrowDown";

type ExpandIconButtonProps = {
  expanded: boolean;
  onExpand: (record: any, e: React.MouseEvent<HTMLElement>) => void;
  record: any;
};

const ExpandIconButton: React.FC<ExpandIconButtonProps> = ({
  expanded,
  onExpand,
  record,
}) => {
  if (!record.children?.length && !record.details?.length) return null;

  const color = expanded ? COLORS.PRIMARY : COLORS.BORDER;

  return (
    <button
      className={`bg-white ease-in-out flex justify-center w-6 h-6 my-1 items-center rounded-full transition-transform duration-200 ${
        expanded ? "" : "-rotate-90"
      }`}
      style={{
        border: `1px solid ${color}`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onExpand(record, e);
      }}
      title={expanded ? "Thu gọn" : "Mở rộng"}
    >
      <IconArrowDown color={color} />
    </button>
  );
};

export default ExpandIconButton;
