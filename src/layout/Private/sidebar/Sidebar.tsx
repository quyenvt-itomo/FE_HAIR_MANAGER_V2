/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Layout } from "antd";
import "./sidebar.css";
import { MenuProps } from "rc-menu";
import { COLORS } from "../../../constants/UI";
import UserBar from "../header/components/UserBar";
import CustomMenu from "./components/Menu";
import Logo from "../../../components/Logo";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../stores";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export type SideBarProps = {
  items: MenuItem[];
};

const siderStyle: React.CSSProperties = {
  height: "100vh",
  insetInlineStart: 0,
  padding: "12px",
  paddingRight: "16px",
  top: 0,
  bottom: 0,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  zIndex: 1,
};

const siderHorizontalStyle: React.CSSProperties = {
  height: "88px",
  maxHeight: "88px",
  insetInlineStart: 0,
  padding: "12px 12px 12px 12px",
  top: 0,
  bottom: 0,
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  zIndex: 1,
};

const sidebarStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLORS.SIDEBAR_BG,
  height: "100%",
  borderRadius: "3px",
};

const sidebarHorizontalStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: COLORS.SIDEBAR_BG,
  height: "64px",
  maxHeight: "64px",
  borderRadius: "3px",
  paddingRight: "16px",
};

const Sidebar: React.FC<SideBarProps> = ({ items }) => {
  const { horizontal, collapsed } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  return (
    <Sider
      style={horizontal ? siderHorizontalStyle : siderStyle}
      width={horizontal ? "100vw" : 320}
      collapsedWidth={horizontal ? "100vw" : 152}
      collapsed={collapsed}
      theme="light"
      className={`inset-y-0 left-0 bg-blue-300-50 z-10 hidden lg:block`}
    >
      <div style={horizontal ? sidebarHorizontalStyle : sidebarStyle}>
        <Logo />
        <CustomMenu items={items} />
        {horizontal ? (
          <div className="flex items-center h-full gap-4">
            <UserBar />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Sider>
  );
};

export default Sidebar;
