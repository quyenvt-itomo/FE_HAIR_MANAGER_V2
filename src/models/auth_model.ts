export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginData {
  id: number; // ID của người dùng
  username: string; // Tên đăng nhập
  name: string; // Họ và tên đầy đủ
  email: string; // Email của người dùng
  phone: string | null; // Số điện thoại (nullable)
  department_id: number | null; // ID phòng ban (nullable)
  avatar: string | null; // Ảnh đại diện (nullable)
  role: string; // Vai trò của người dùng (VD: ADMIN, USER, v.v.)
  access_token: string; // Token xác thực
  refresh_token: string; // Token refresh
}
export interface LoginReponse {
  statusCode: number; // Mã trạng thái HTTP trả về
  success: boolean; // Trạng thái thành công của yêu cầu
  message: string; // Thông báo từ server
  data?: LoginData;
}
export interface LogoutRequest {
  username: string;
  password: string;
}
export interface UserInfo {
  id?: number;
  code: string;
  username?: string;

  employee_id?: number;
  employee?: any;

  email?: string;

  permissions?: { name: string; check: boolean }[];

  is_first_loggin: boolean;
  is_default: boolean;
  is_disabled: boolean;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
  is_logout?: boolean;
}
