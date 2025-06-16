import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { setHorizontal } from "../../stores/client/slice";
import { IconLayout } from "../icon/Layout";

export const ToggleHorizontal: React.FC = () => {
  const dispatch = useDispatch();
  const { horizontal, collapsed } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );
  return (
    <div
      className={` flex ${
        horizontal ? "fixed right-[220px]" : "absolute right-3"
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
        <IconLayout />
      </button>
      <button
        className={`p-2 rounded-md hover:bg-[#BAD4E9] rotate-90 ${
          !horizontal ? "" : "bg-[#BAD4E9]"
        }`}
        onClick={() => {
          if (!horizontal) dispatch(setHorizontal(true));
        }}
      >
        <IconLayout />
      </button>
    </div>
  );
};
