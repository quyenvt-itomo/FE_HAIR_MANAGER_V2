class BloomFilter {
    private size: number;            // Kích thước mảng bit
    private hashCount: number;       // Số lượng hàm băm
    private bitArray: Uint8Array;    // Mảng bit

    constructor(size: number = 10000, hashCount: number = 7) {
        this.size = size;
        this.hashCount = hashCount;
        this.bitArray = new Uint8Array(size); // Dùng Uint8Array tối ưu bộ nhớ
    }

    // 🔥 Hàm băm 1 (DJB2 Hash)
    private hash1(str: string): number {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 33) ^ str.charCodeAt(i);
        }
        return Math.abs(hash) % this.size;
    }

    // 🔥 Hàm băm 2 (SDBM Hash)
    private hash2(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
        }
        return Math.abs(hash) % this.size;
    }

    // 🔥 Lấy danh sách các chỉ mục từ nhiều hàm băm
    private getHashes(str: string): number[] {
        const hashes: number[] = [];
        const h1 = this.hash1(str);
        const h2 = this.hash2(str);

        for (let i = 0; i < this.hashCount; i++) {
            hashes.push((h1 + i * h2) % this.size);
        }
        return hashes;
    }

    // 🔍 Kiểm tra xem username có trong Bloom Filter không
    public has(username: string): boolean {
        const hashes = this.getHashes(username);
        return hashes.every(index => this.bitArray[index] === 1);
    }

    // ➕ Thêm username vào Bloom Filter
    public add(username: string): void {
        if (this.has(username)) return; // Nếu đã tồn tại, bỏ qua
        const hashes = this.getHashes(username);
        hashes.forEach(index => this.bitArray[index] = 1);
    }

    // 🔄 Load danh sách user hoạt động khi server restart
    public loadActiveUsers(activeUsers: string[]): void {
        this.bitArray.fill(0); // Xóa mảng bit cũ
        activeUsers.forEach(user => this.add(user));
    }
}

// 🛠️ **Giả lập database (thường sẽ lấy từ SQL hoặc MongoDB)**
async function getActiveUsersFromDB(): Promise<string[]> {
    return [
        "quyen",
        "admin",
        "john_doe",
        "jane_doe"
    ]; // 🔥 Giả sử chỉ lấy user có is_deleted = false
}

// 🛠️ **Khởi động Bloom Filter khi server chạy**
async function initializeBloomFilter(): Promise<BloomFilter> {
    const bf = new BloomFilter(10000, 7);
    const activeUsers = await getActiveUsersFromDB();
    bf.loadActiveUsers(activeUsers);
    return bf;
}

// 🛠️ **Test**
initializeBloomFilter().then(bf => {
    console.log(bf.has("quyen")); // ✅ True
    console.log(bf.has("deleted_user")); // ❌ False (Vì user này đã bị xóa trong DB)
});
