/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
import UserBar from "./components/UserBar";
import CustomTitle from "./components/Title";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setDrawerOpen } from "../../../stores/client/slice";
import { RootState } from "../../../stores";

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  return (
    <Header
      style={{
        margin: "12px 0",
        height: 64,
      }}
      className="bg-white flex flex-row justify-between items-center p-0 border-none select-none"
    >
      <div className="flex items-center h-full">
        <Button
          icon={<MenuOutlined />}
          onClick={() => dispatch(setDrawerOpen(!drawerOpen))}
          className="mr-4 lg:hidden"
        />
        <CustomTitle />
      </div>
      <div className="flex items-center h-full gap-4">
        <UserBar />
      </div>
    </Header>
  );
};

export default AppHeader;
