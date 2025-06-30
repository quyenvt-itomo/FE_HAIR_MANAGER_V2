import { Pagination, Select } from "antd";
import { PaginationProps } from "../models/base/api_response_model";
import { IconArrowDown } from "./icon/ArrowDown";
import { useEffect } from "react";

const { Option } = Select;

export interface CustomPaginationProps {
  pagination: PaginationProps | null | undefined;
  length: number;
  itemName: string;
  showTotal?: boolean;
  setPage: (value: number) => void;
  setPageLimit: (value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  pagination,
  length,
  itemName,
  showTotal,
  setPage,
  setPageLimit,
}) => {
  const {
    currentPage = 1,
    size = 20,
    totalPages = 1,
    totalRecords = 0,
  } = pagination || {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;

      if (e.key === "ArrowLeft" && currentPage > 1) {
        e.preventDefault();
        setPage(currentPage - 1);
      }

      if (e.key === "ArrowRight" && currentPage < totalPages) {
        e.preventDefault();
        setPage(currentPage + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages, setPage]);

  return (
    <div className="flex justify-between items-center w-full pt-2">
      {/* Bên trái: Chọn số hàng hóa trên 1 trang */}
      <div className="flex gap-2 items-center text-gray-500">
        {showTotal && (
          <span className="hidden lg:flex">
            {`Số ${itemName} trên một trang`}
          </span>
        )}
        <Select
          value={pagination?.size || 20}
          style={{ width: 80 }}
          onChange={(value) => {
            setPageLimit(value);
            setPage(1);
          }}
          suffixIcon={<IconArrowDown />}
        >
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
          <Option value={100}>100</Option>
        </Select>
      </div>

      {/* Chính giữa: Hiển thị số lượng hiện tại */}
      {showTotal && (
        <div className="hidden lg:flex text-gray-500">
          {`Đang hiển thị ${length} trên tổng số ${
            totalRecords || 0
          } ${itemName}`}
        </div>
      )}

      {/* Bên phải: Nút chuyển trang */}
      <div className="w-[352px] flex justify-end">
        <Pagination
          current={currentPage}
          pageSize={size}
          total={totalRecords}
          showSizeChanger={false}
          onChange={(newPage: number) => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default CustomPagination;
