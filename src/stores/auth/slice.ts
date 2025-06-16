import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChangePasswordData,
  LoginData,
  LoginReponse,
  LoginRequest,
  UserInfo,
} from "../../models/auth_model";
import { TypeMessage } from "../../enums/typeMessage";
import { MessageToastModel } from "../../types/message_toast_model";
import { RootState } from "..";
import { ApiResponse } from "../../models/base/api_response_model";
import { BaseFailurePayload } from "../baseReducers";

export interface AuthState {
  loginData: LoginReponse | null;
  loginError: LoginReponse | null;
  logoutData: LoginReponse | null;
  logoutError: LoginReponse | null;
  loading: boolean;
  error: string | null;
  isLoading: boolean;
  selectArrayPermisstion: { name: string; check: boolean }[] | [];
  message: MessageToastModel;
  userInfo: UserInfo | null;
  isCheckUpdateDataInfo: boolean;

  isCheckUnAuthor: boolean;
  isCheckChangePassword: boolean;
}

const initialState: AuthState = {
  loginData: null,
  loginError: null,
  logoutError: null,
  logoutData: null,
  loading: false,
  error: null,
  isLoading: false,
  selectArrayPermisstion: [],
  message: { type: TypeMessage.none },
  userInfo: null,
  isCheckUpdateDataInfo: false,

  isCheckUnAuthor: false,
  isCheckChangePassword: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // clear message
    clearMessage: (state) => {
      state.message = {
        type: TypeMessage.none,
      };
    },

    //login
    login: (state, _action: PayloadAction<LoginRequest>) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<LoginReponse>) => {
      state.loading = false;
      state.loginData = action.payload;
      state.loginError = null;
    },
    loginFailure: (state, action: PayloadAction<LoginReponse>) => {
      state.loading = false;
      state.loginError = action.payload;
      state.loginData = null;
    },
    resetLogin: (state) => {
      state.loginData = null;
      state.loginError = null;
      state.error = null;
    },

    getDataInfo: (state) => {
      state.loading = true;
    },
    getDataInfoSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.loading = false;
      state.userInfo = action.payload.data;
      state.selectArrayPermisstion = action.payload.data?.permissions || [];
    },
    getDataInfoFailure: (state, action: PayloadAction<BaseFailurePayload>) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.error,
        message: action.payload.message,
      };
    },

    updateDataInfo: (state, action: PayloadAction<UserInfo>) => {
      state.loading = true;
    },
    updateDataInfoSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.loading = false;
      state.userInfo = action.payload.data;
      state.message = {
        type: TypeMessage.success,
        message: "Cập nhật thông tin tài khoản thành công",
      };
      state.isCheckUpdateDataInfo = true;
    },
    updateDataInfoFailure: (
      state,
      action: PayloadAction<BaseFailurePayload>
    ) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.error,
        message: action.payload.message,
      };
    },

    changePassword: (state, action: PayloadAction<ChangePasswordData>) => {
      state.loading = true;
    },
    changePasswordSuccess: (state, action: PayloadAction<ApiResponse>) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.success,
        message: "Đổi mật khẩu thành công",
      };
      state.isCheckChangePassword = true;
    },
    changePasswordFailure: (
      state,
      action: PayloadAction<BaseFailurePayload>
    ) => {
      state.loading = false;
      state.message = {
        type: TypeMessage.error,
        message: action.payload.message,
      };
    },

    //logout
    logout: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state: AuthState, action: PayloadAction<LoginReponse>) => {
      state.loading = false;
      state.logoutData = action.payload;
      state.logoutError = null;
    },
    logoutFailure: (state: AuthState, action: PayloadAction<LoginReponse>) => {
      state.loading = false;
      state.logoutData = action.payload;
      state.logoutError = null;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectArrayPermisstion: (
      state,
      action: PayloadAction<{ name: string; check: boolean }[]>
    ) => {
      state.selectArrayPermisstion = action.payload;
    },
    setIsCheckUpdateDataInfo: (state, action: PayloadAction<boolean>) => {
      state.isCheckUpdateDataInfo = action.payload;
    },

    setIsCheckUnAuthor: (state, action: PayloadAction<boolean>) => {
      state.isCheckUnAuthor = action.payload;
    },

    resetChangePassword: (state) => {
      state.isCheckChangePassword = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  resetLogin,
  logout,
  logoutSuccess,
  logoutFailure,
  setIsLoading,
  setSelectArrayPermisstion,
  getDataInfo,
  getDataInfoSuccess,
  getDataInfoFailure,
  updateDataInfo,
  updateDataInfoFailure,
  updateDataInfoSuccess,
  changePassword,
  changePasswordFailure,
  changePasswordSuccess,
  setIsCheckUpdateDataInfo,

  setIsCheckUnAuthor,
  resetChangePassword,
  clearMessage
} = authSlice.actions;

export default authSlice.reducer;

export const userPermissions = (state: RootState) =>
  state.Auth.selectArrayPermisstion;
