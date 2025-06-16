import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../stores";
import { publicRoutesName } from "../../../../constants/routerName";
import { logout } from "../../../../stores/auth/slice";
import {
  ArrowLeftStartOnRectangleIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Typography, Dropdown, MenuProps, Modal } from "antd";
import AccountInformation from "./AccountInformation";
import ChangePassword from "./ChangePassword";
import UserImage from "../../../../components/image/UserImage";

type UserBarProps = {};

const { Text } = Typography;

const UserBar: React.FC<UserBarProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>(null);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] =
    useState<boolean>(false);

  const { userInfo } = useSelector(
    (state: RootState) => state.Auth,
    shallowEqual
  );

  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const handleLogout = () => {
    Modal.confirm({
      title: "Đăng xuất",
      content: "Xác nhận đăng xuất",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => {
        dispatch(logout());
        localStorage.removeItem("loginData");
        setTimeout(() => {
          navigate(publicRoutesName.login);
        }, 1000);
      },
    });
  };

  useEffect(() => {
    if (!userInfo) return;

    setUserData(userInfo);
  }, [userInfo]);

  const { username, employee } = userInfo || {};

  const items: MenuProps["items"] = [
    {
      key: "change_info",
      label: "Thông tin tài khoản",
      icon: <UserCircleIcon className="w-5 h-5" />,
      onClick: () => {
        setOpenModalInfo(true);
      },
    },
    {
      key: "change_password",
      label: "Đổi mật khẩu",
      icon: <LockClosedIcon className="w-5 h-5" />,
      onClick: () => setOpenModalChangePassword(true),
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: () => {
        handleLogout();
        localStorage.removeItem("data");
        localStorage.removeItem("loginData");
        sessionStorage.removeItem("loginData");
      },
      icon: <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex justify-end">
      <Dropdown menu={{ items }} trigger={["click"]} className="cursor-pointer">
      <section
          className="flex flex-row items-center gap-2"
          onClick={(e) => e.preventDefault()}
        >
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <UserImage src={employee?.avatar} />
          </div>
          {!horizontal && <div className="hidden md:flex flex-row items-center">
            <div className="flex flex-col select-none">
              <Text className="font-semibold">{employee?.name || username}</Text>
              <Text className="text-gray-400">{username}</Text>
            </div>
          </div>}
        </section>
      </Dropdown>
      <AccountInformation
        open={openModalInfo}
        onClose={() => setOpenModalInfo(false)}
      />
      <ChangePassword
        open={openModalChangePassword}
        onClose={() => setOpenModalChangePassword(false)}
      />
    </div>
  );
};

export default UserBar;
