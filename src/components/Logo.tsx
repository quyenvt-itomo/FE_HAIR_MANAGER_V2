import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { COLORS } from "../constants/UI";
import { IconLayout } from "./icon/Layout";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores";
import { setCollapsed, setHorizontal } from "../stores/client/slice";
import { icons } from "../assets/icons";
import { IconArrowDown } from "./icon/ArrowDown";
import { useNavigate } from "react-router-dom";

const logoStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 10,
};

const Logo: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { horizontal, collapsed } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  return (
    <div className={`h-16 cursor-pointer ${horizontal ? "w-48" : ""}`} style={logoStyle}>
      <div className="flex px-7 gap-2 items-center relative h-full w-full select-none">
        <img src={icons.logo} className="cursor-pointer" onClick={() => navigate("/")} />
        {/* Toggle horizontall container */}
        <div
          className={`flex ${
            horizontal ? "fixed right-[120px]" : "absolute right-3"
          } gap-1 ${collapsed ? "hidden" : ""}`}
        >
          <button
            className={`p-2 rounded-md hover:bg-[#BAD4E9] ${
              horizontal ? "" : "bg-[#BAD4E9]"
            }`}
            onClick={() => {
              if (horizontal) dispatch(setHorizontal(false));
            }}
          >
            <IconLayout color={horizontal ? undefined : COLORS.PRIMARY} />
          </button>
          <button
            className={`p-2 rounded-md hover:bg-[#BAD4E9] rotate-90 ${
              !horizontal ? "" : "bg-[#BAD4E9]"
            }`}
            onClick={() => {
              if (!horizontal) dispatch(setHorizontal(true));
            }}
          >
            <IconLayout color={horizontal ? COLORS.PRIMARY : undefined} />
          </button>
        </div>
        {horizontal ? (
          <></>
        ) : (
          <div
            className={`absolute flex right-[-14px] top-[90vh] bg-white w-7 h-7 cursor-pointer justify-center items-center rounded-[8px] ${
              collapsed ? "-rotate-90" : "rotate-90"
            } transition-all ease-in-out duration-400`}
            onClick={() => dispatch(setCollapsed(!collapsed))}
            style={{
              border: `0.5px solid #d3d3d3`,
            }}
          >
            <IconArrowDown color="blue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
