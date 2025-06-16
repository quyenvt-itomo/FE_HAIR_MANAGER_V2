import { Button, Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";
import { ExportExcelQuery } from "../../models/base/excel_model";
import { useExcelData } from "../../hooks/useExcelData";
import { icons } from "../../assets/icons";
import ModalImportExcel from "../modal/ModalImportExcel";

interface ExcelButtonProps {
  isShowImport?: boolean;
  isShowExport?: boolean;
  exportExcelQuery: ExportExcelQuery;
}

const ExcelButton: React.FC<ExcelButtonProps> = ({
  isShowImport = false,
  isShowExport = false,
  exportExcelQuery,
}) => {
  const [open, setOpen] = useState(false);

  const {
    loading,
    getCurrentTemplate,
    importCurrentExcel,
    exportCurrentExcel,
  } = useExcelData(exportExcelQuery);

  const handleExportExcel = (type: "excel" | "pdf") => {
    if (!exportExcelQuery) return;
    exportCurrentExcel(type);
  };

  const items = [
    isShowExport && {
      label: (
        <div className="flex gap-1">
          <img src={icons.Excel} />
          <Space className="font-light">Xuất Excel</Space>
        </div>
      ),
      loading,
      key: "export_excel",
      onClick: () => handleExportExcel("excel"),
    },
    isShowExport && {
      label: (
        <div className="flex gap-1 items-center">
          <img
            src={icons.filePDF}
            className="w-5 h-5"
            style={{
              filter:
                "invert(61%) sepia(79%) saturate(4921%) hue-rotate(2deg) brightness(101%) contrast(102%)",
            }}
          />
          <Space className="font-light">Xuất PDF</Space>
        </div>
      ),

      loading,
      key: "export_pdf",
      onClick: () => handleExportExcel("pdf"),
    },
    isShowImport && {
      label: (
        <div className="flex gap-1">
          <img src={icons.Excel} />
          <Space className="font-light">Nhập Excel</Space>
        </div>
      ),
      loading,
      key: "import",
      onClick: () => setOpen(true),
    },
  ].filter(Boolean) as MenuProps["items"];

  if (!isShowImport && !isShowExport) return null;

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} className="rounded-[3px]">
        <Button className="h-8" onClick={(e) => e.preventDefault()}>
          <Space className="ml-1 font-light">Thao tác</Space>
          <img src={icons.ArrowDown} />
        </Button>
      </Dropdown>
      <ModalImportExcel
        loading={loading}
        open={open}
        type={exportExcelQuery.type}
        setClose={() => setOpen(false)}
        onGetCurrentTemplate={getCurrentTemplate}
        onImportCurrentExcel={importCurrentExcel}
      />
    </>
  );
};

export default ExcelButton;
