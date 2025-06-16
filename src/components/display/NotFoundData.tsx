import { Empty } from "antd";
import React from "react";

const NotFoundData: React.FC = () => {
    return (
        <div className="flex w-full h-full max-h-96 items-center justify-center">
            <div
                className="flex flex-col gap-1 items-center leading-none select-none "
            >
                <Empty />
                <span style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#8A96A3",
                    margin: "16px 0 4px"
                }}>Không tìm thấy dữ liệu</span>
            </div>
        </div>
    )
}

export default NotFoundData;