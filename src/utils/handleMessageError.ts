import i18next from "i18next";
import { ERROR } from "../constants/translate";
import { BaseError, BaseErrorMethod, BaseFailurePayload } from "../stores/baseReducers";

export type ObjectKeys = keyof typeof ERROR;

export function handleErrorMessage(
  error: any,
  method?: BaseErrorMethod,
  object?: ObjectKeys
): BaseFailurePayload {
  try {
    const { errors, message } = error;

    if (!errors || !Array.isArray(errors) || errors.length === 0) {
      let translatedMessage = "Đã xảy ra lỗi không xác định";

      const parts = typeof message === "string" ? message.split(".") : [];

      try {
        translatedMessage =
          message ||
          i18next.t(
            `error.${object || "example"}.${method || "add"}.${message}`
          );
      } catch {
        translatedMessage = message || "Đã xảy ra lỗi không xác định";
      }

      return {
        message: translatedMessage,
        errors: [
          {
            key: parts[0] || "unknown",
            message: translatedMessage,
          },
        ],
      };
    }

    const parsedErrors: BaseError[] = [];
    const parsedMessages: string[] = [];

    errors.forEach((error: string) => {
      const parts = typeof error === "string" ? error.split(".") : [];

      if (parts.length < 2) return;

      const key = parts[0];
      const messageKey = parts[1];
      const element_key = parts[2] || undefined;

      const translated = i18next.t(
        `error.${object || "example"}.${method || "add"}.${key}.${messageKey}`
      );

      parsedErrors.push({
        key,
        message: translated || messageKey,
        element_key,
      });

      parsedMessages.push(translated || `${key}.${messageKey}`);
    });

    return {
      message: parsedMessages.join("\n"),
      errors: parsedErrors,
    };
  } catch (e) {
    console.log("handleErrorMessage: ", e)
    return {
      message: "Đã xảy ra lỗi không xác định",
      errors: [],
    };
  }
}
