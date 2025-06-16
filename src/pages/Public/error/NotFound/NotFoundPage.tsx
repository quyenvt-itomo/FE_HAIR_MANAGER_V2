import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, đường dẫn này không tồn tại."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Trở lại trang chủ
        </Button>
      }
      className="bg-white w-full h-screen "
    />
  );
};

export default NotFoundPage;
