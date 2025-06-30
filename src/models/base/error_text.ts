import { BaseErrorMethod, BaseErrorType } from "../../stores/baseReducers";

export type ErrorText = {
  [T in BaseErrorType]?: string;
};

export type ErrorField<T> = {
  [K in keyof T]?: ErrorText;
};

export type ObjectError<T> = {
  [M in BaseErrorMethod]?: ErrorField<T>;
};
