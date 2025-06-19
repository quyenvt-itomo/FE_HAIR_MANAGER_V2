import { Modal, Button } from "antd";
import { downloadFile } from "../../utils/downloadFile";
import { ImportExcelResult } from "../../models/base/excel_model";

export const showImportResultModal = (result: ImportExcelResult) => {
  const { total, success, url } = result;

  Modal.info({
    title: "Kết quả nhập Excel",
    content: (
      <div>
        <p>
          Tổng số dòng: <b>{total}</b>
        </p>
        <p>
          Số dòng thành công: <b>{success}</b>
        </p>
        {url && (
          <p >
            Số dòng lỗi: <b
              className="text-red-600">{total - success}</b>{" "}
            <Button
              type="link"
              className="text-red-600"
              onClick={() => downloadFile(url)}
              style={{ padding: 0 }}
            >
              Tải file lỗi
            </Button>
          </p>
        )}
      </div>
    ),
    okText: "Đóng",
    centered: true,
    width: 400,
  });
};
