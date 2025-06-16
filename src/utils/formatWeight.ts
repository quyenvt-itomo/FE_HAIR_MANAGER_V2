export function formatWeight(weight: number): string {
    return new Intl.NumberFormat('vi-VN', {
        maximumFractionDigits: 3, // Giới hạn tối đa 2 chữ số thập phân
    }).format(weight);
}