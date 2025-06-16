export interface Permission {
  name: string;
  check: boolean;
}

/**
 * Kiểm tra xem user có quyền cụ thể nào đó không
 * @param permissions Danh sách quyền của user
 * @param requiredPermissions Danh sách quyền cần kiểm tra
 * @returns true nếu user có tất cả các quyền cần thiết, ngược lại false
 */
export const hasAllRequiredPermission = (
  permissions: Permission[],
  requiredPermissions: string[]
): boolean => {
  return requiredPermissions.every((perm) =>
    permissions.some((userPerm) => userPerm.name == perm && userPerm.check)
  );
};

export const hasAnyRequiredPermission = (
  permissions: Permission[],
  requiredPermissions: string[]
): boolean => {
  return true
  // return requiredPermissions.some((perm) =>
  //   permissions.some((userPerm) => userPerm.name == perm && userPerm.check)
  // );
};
