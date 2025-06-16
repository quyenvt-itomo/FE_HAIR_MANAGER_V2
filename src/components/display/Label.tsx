const Label: React.FC<{
  title: string;
  required?: boolean;
}> = ({ title, required }) => {
  return (
    <span className="w-36 h-9 flex items-center">
      {title} {required && <span className="required">*</span>}
    </span>
  );
};

export default Label;
