import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "antd";

interface AddButtonProps {
  title?: string;
  onOpenAddModal?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({
  title,
  onOpenAddModal = () => {},
}) => {
  return (
    <Button
      type="primary"
      className="min-w-28 h-8 rounded-[3px] font-light"
      onClick={onOpenAddModal}
    >
      <PlusIcon className="h-5 w-5" />
      {title || "Thêm"}
    </Button>
  );
};

export default AddButton;
