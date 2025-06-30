const Label: React.FC<{
  title: string;
  required?: boolean;
  width?: number;
}> = ({ title, required, width = 144 }) => {
  return (
    <span className="h-9 flex items-center" style={{ width }}>
      {title} {required && <span className="required">*</span>}
    </span>
  );
};

export default Label;
