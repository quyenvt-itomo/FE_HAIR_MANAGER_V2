import { Tooltip } from "antd";

const ContentTooltip: React.FC<{
  title: string;
  content?: string;
  required?: boolean;
}> = ({ title, content, required }) => {
  return (
    <div className="flex items-center">
      <Tooltip title={content || title} color="blue">
        <span className="ellipsis-cell w-full">
          {title} {required && <span className="required">*</span>}
        </span>
      </Tooltip>
    </div>
  );
};

export default ContentTooltip;
