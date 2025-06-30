import { DataType } from "./DetailTable";

// TODO: Hàm tính dòng tổng
export function calculateSummaryRow(data: DataType[]) {
  const summary = {
    isSummary: true, // Đánh dấu đây là dòng tổng kết
    index: "", // Không cần đánh số dòng cho tổng
    quantity: 0, // Tổng số lượng lý thuyết
    money: 0,
    code: "Tổng cộng", // Hiển thị tên nhóm
  };

  data.forEach((item) => {
    const { quantity = 0, price = 0 } = item;
    const money = quantity * price;

    // Cộng dồn vào dòng tổng kết
    summary.quantity += quantity;
    summary.money += money;
  });

  return summary;
}
