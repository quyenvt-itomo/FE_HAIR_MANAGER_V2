/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { MenuProps } from "rc-menu";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { privateRoutesName } from "../../../../constants/routerName";

type MenuItem = Required<MenuProps>["items"][number];

export type CustomeMenuProps = {
  items: MenuItem[];
};

const CustomMenu: React.FC<CustomeMenuProps> = ({ items }) => {
  const defaultOpenKeys = ["report"];
  const [selectedKeys, setSelectedKeys] = useState("/");

  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  useEffect(() => {
    const pathName = location.pathname;

    // TODO: Product
    if (
      [
        privateRoutesName.categories.product.page,
        privateRoutesName.categories.product.add,
        privateRoutesName.categories.product.update,
        privateRoutesName.categories.product.detail,
      ].includes(pathName)
    ) {
      setSelectedKeys(privateRoutesName.categories.product.page);
      return;
    }

    // TODO: purchase
    if (
      [
        privateRoutesName.operations.purchase.page,
        privateRoutesName.operations.purchase.add,
        privateRoutesName.operations.purchase.update,
        privateRoutesName.operations.purchase.detail,
      ].includes(pathName)
    ) {
      setSelectedKeys(privateRoutesName.operations.purchase.page);
      return;
    }

    // TODO: order
    if (
      [
        privateRoutesName.operations.order.page,
        privateRoutesName.operations.order.add,
        privateRoutesName.operations.order.update,
        privateRoutesName.operations.order.detail,
      ].includes(pathName)
    ) {
      setSelectedKeys(privateRoutesName.operations.order.page);
      return;
    }

    setSelectedKeys(pathName);
  }, [location.pathname]);

  return (
    <Menu
      theme="light"
      mode={horizontal ? "horizontal" : "inline"}
      className={`${
        horizontal ? "" : "overflow-auto"
      } sidebar-menu select-none flex-1`}
      items={items}
      // defaultOpenKeys={defaultOpenKeys}
      selectedKeys={[selectedKeys]}
    />
  );
};

export default CustomMenu;
