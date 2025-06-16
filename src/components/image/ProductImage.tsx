import React, { useState } from "react";
import { Image } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import defaultProduct from "../../assets/defaultProduct.jpg";
import { HOST_URL } from "../../constants/ApiEndpoint";

interface ProductImageProps {
  src?: string | null;
  width?: number;
  height?: number;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  width = 40,
  height = 40,
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const imageSrc = !hasError && src ? `${HOST_URL}${src}` : defaultProduct;
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

export default ProductImage;
