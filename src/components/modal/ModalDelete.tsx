import React from "react";
import { Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";

interface ModalDeleteProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    accept: () => void;
    msg?: string;
    warningMsg?: string;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
    open,
    setOpen,
    accept,
    msg = "Bạn chắc chắn muốn xóa mục này?",
    warningMsg = "Tất cả dữ liệu sẽ bị xóa không thể khôi phục lại",
}) => {
    const handleOk = () => {
        accept();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                centered
                title={
                    <span>
                        <WarningOutlined
                            style={{ marginRight: 8, color: "red" }}
                        />
                        {msg}
                    </span>
                }
                open={open}
                onCancel={() => setOpen(false)}
                onOk={handleOk}
                onClose={handleCancel}
                width={500}
                okText="Xác nhận"
                cancelText="Hủy"
                maskClosable={false}
            >
                <h1>{warningMsg}</h1>
            </Modal>
        </>
    );
};

export default ModalDelete;
