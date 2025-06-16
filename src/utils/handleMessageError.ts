import { BaseFailurePayload } from "../stores/baseReducers";
import { ERROR } from "../constants/translate";

export type ObjectKeys = keyof typeof ERROR;

export function handleErrorMessage(
  error: any,
  method?: "add" | "get" | "update" | "delete",
  object?: ObjectKeys
): BaseFailurePayload {
  const { errors, message } = error;

  return {
    message: message,
    errors: errors,
  };
}
