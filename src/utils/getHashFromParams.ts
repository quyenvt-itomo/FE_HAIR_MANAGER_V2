export function getHashFromParams(): string | null {
    // Nếu không truyền URL, sử dụng URL hiện tại
    const currentUrl = window.location.href;

    // Tìm dấu #
    const hashIndex = currentUrl.indexOf('#');

    // Nếu không tìm thấy #, trả về null
    if (hashIndex === -1) {
        return null;
    }

    // Cắt và trả về phần hash (sau dấu #)
    return currentUrl.slice(hashIndex + 1) || null;
}