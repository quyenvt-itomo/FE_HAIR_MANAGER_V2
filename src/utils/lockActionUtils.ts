import { UserInfo } from "../models/auth_model";

export const handleCheckLockAction = (record: any, info: UserInfo | null) => {
  if (info?.username === "admin") return false;
  if (!record) return true;
  return !!record.status && record.status !== "pending";
};
