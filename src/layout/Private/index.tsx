import React from "react";
import { sideBarMenuItem } from "./sidebar/components/MenuItem";
import Sidebar from "./sidebar/Sidebar";
import DrawerMenu from "./drawer/drawer";
import AppHeader from "./header";
import { Layout } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";

const { Content } = Layout;

type PrivateLayoutProps = {
  children: React.ReactNode;
};

const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  return (
    <Layout
      className={`h-screen overflow-hidden !p-0 ${
        horizontal ? "flex !flex-col" : ""
      }`}
    >
      <Sidebar items={sideBarMenuItem()} />
      <DrawerMenu items={sideBarMenuItem()} />
      <Layout
        className={`transition-all relative duration-200 pt-0 p-3 flex-grow flex flex-col ${
          horizontal ? "!w-full" : "lg:pl-0"
        }`}
      >
        <div className={`${horizontal ? "lg:hidden" : ""}  `}>
          <AppHeader />
        </div>
        <Content className="flex-grow overflow-y-hidden">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
