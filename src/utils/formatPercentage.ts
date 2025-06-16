export function formatPercentage(value: number): string {
    return (new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 3, // Chỉ hiển thị 2 chữ số thập phân
        maximumFractionDigits: 3, // Giới hạn tối đa 2 chữ số thập phân
    }).format(value)) + " %";
}