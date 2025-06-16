import React, { useState } from "react";
import { Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import defaultUser from "../../assets/defaultAvatar.jpg";
import { HOST_URL } from "../../constants/ApiEndpoint";

interface UserImageProps {
  src?: string | null;
  width?: number;
  height?: number;
}

const UserImage: React.FC<UserImageProps> = ({
  src,
  width = 40,
  height = 40,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const imageSrc = !hasError && src ? `${HOST_URL}${src}` : defaultUser;
  const enablePreview = !hasError && src;

  return (
    <Image
      src={imageSrc}
      preview={
        enablePreview
          ? {
              mask: <EyeOutlined style={{ fontSize: 16 }} />,
            }
          : false
      }
      width={width}
      height={height}
      style={{ objectFit: "cover", borderRadius: "50%" }}
      onError={handleError}
    />
  );
};

export default UserImage;
