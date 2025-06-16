import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../models/auth_model";

export interface ClientState {
  horizontal: boolean;
  collapsed: boolean;
  isMobile: boolean;
  drawerOpen: boolean;
  info: UserInfo | null;
  permissions: { name: string; check: boolean }[];
}

const initialState: ClientState = {
  horizontal: false,
  collapsed: false,
  isMobile: false,
  drawerOpen: false,
  info: null,
  permissions: [],
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setHorizontal: (state, action: PayloadAction<boolean>) => {
      state.horizontal = action.payload;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.drawerOpen = action.payload;
    },
    setInfo: (state, action: PayloadAction<UserInfo>) => {
      state.info = action.payload;
      state.permissions = action.payload.permissions || [];
    },
  },
});

export const {
  setHorizontal,
  setCollapsed,
  setIsMobile,
  setDrawerOpen,
  setInfo,
} = clientSlice.actions;

export default clientSlice.reducer;
