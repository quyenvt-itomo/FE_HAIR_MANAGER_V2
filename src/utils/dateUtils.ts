import dayjs from "dayjs";

export const defaultStartDate = dayjs().startOf("month").format("YYYY-MM-DD");
export const defaultEndDate = dayjs().endOf("month").format("YYYY-MM-DD");

/**
 * Lấy ngày đầu và cuối của tháng hiện tại dưới dạng chuỗi ISO.
 * @returns Một object chứa `fromDate` (ngày đầu tháng) và `toDate` (ngày cuối tháng).
 */
export const getStartAndEndOfMonth = (): {
  fromDate: string;
  toDate: string;
} => {
  const fromDate = dayjs().startOf("month").toISOString();
  const toDate = dayjs().endOf("month").toISOString();
  return { fromDate, toDate };
};

export const getSessionStartDate = (): string => {
  const startDate = sessionStorage.getItem("dateRangeStart");
  return startDate || defaultStartDate;
};
export const getSessionEndDate = (): string => {
  const endDate = sessionStorage.getItem("dateRangeEnd");
  return endDate || defaultEndDate;
};

export const formatDate = (date: string | Date): string => {
  // Kiểm tra nếu date là null hoặc undefined
  if (!date) return "";

  // Nếu date là string, chuyển thành Date object
  const parsedDate = new Date(date);

  // Kiểm tra nếu date không hợp lệ
  if (isNaN(parsedDate.getTime())) return "";

  // Định dạng ngày theo dạng yyyy-mm-dd
  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Thêm số 0 vào trước tháng nếu tháng < 10
  const day = parsedDate.getDate().toString().padStart(2, "0"); // Thêm số 0 vào trước ngày nếu ngày < 10

  return `${year}-${month}-${day}`;
};

export const formatDateDDMMYYYY = (date: string | Date | undefined): string => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) return "";

  // Sử dụng UTC để đảm bảo không bị ảnh hưởng bởi múi giờ
  const day = parsedDate.getUTCDate().toString().padStart(2, "0");
  const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Tháng tính từ 0
  const year = parsedDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateHHmmssDDMMYYYY = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

export const formatDateYYYYMMDD = (value: string | null) => {
  if (!value) return;
  return dayjs(value).format("YYYY-MM-DD hh:mm:ss");
};

export const formatDateTime = (date: string | Date | undefined): string => {
  if (!date) return "";
  const formattedDate = formatDate(date);
  const formattedTime = dayjs(date).format("HH:mm:ss");
  return `${formattedDate} ${formattedTime}`;
};

export function formatDateTimeDDMMYYYY(dateString: string) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}
