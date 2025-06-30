import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../stores";

export const useClientData = () => {
  const { collapsed, drawerOpen, horizontal, info, isMobile, format } =
    useSelector((state: RootState) => state.Client, shallowEqual);

  return {
    collapsed,
    drawerOpen,
    horizontal,
    info,
    isMobile,
    format,
  };
};
