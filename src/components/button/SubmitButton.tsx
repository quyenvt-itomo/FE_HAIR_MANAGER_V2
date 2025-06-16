import { Button } from "antd";
import React from "react";

interface SubmitButtonProps {
  disabledCancel?: boolean;
  disabledSubmit?: boolean;
  loading?: boolean;
  cancleText?: string;
  submitText?: string;
  onCancel: () => void;
  onSubmit: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  disabledCancel,
  disabledSubmit,
  loading,
  cancleText = "Hủy",
  submitText = "Lưu",
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="flex gap-3">
      <Button
        disabled={disabledCancel}
        key="cancel"
        className="h-8 w-24 rounded-[3px] font-light"
        onClick={onCancel}
      >
        {cancleText}
      </Button>
      <Button
        key="save"
        type="primary"
        htmlType="submit"
        className="h-8 w-24 rounded-[3px] font-light"
        disabled={disabledSubmit}
        onClick={onSubmit}
        loading={loading}
      >
        {submitText}
      </Button>
    </div>
  );
};

export default SubmitButton;
