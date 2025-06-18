import React, { useEffect, useState } from "react";
import PrivateLayout from "./layout/Private";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layout/Public";
import AuthMiddleware from "./routes/AuthMiddleware";
import MessageToastManager from "./middleware/MessageToastManager";
import viVN from "antd/es/locale/vi_VN";
import zhCN from "antd/es/locale/zh_CN";
import localConfig from "../localeConfig";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import "dayjs/locale/zh-cn";
import { ConfigProvider, notification } from "antd";
import { privateRoutes, publicRoutes } from "./routes";
import ErrorResetManager from "./middleware/ErrorResetManager";
import NotFoundPage from "./pages/Public/error/NotFound/NotFoundPage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setHorizontal, setIsMobile } from "./stores/client/slice";
import { RootState } from "./stores";
import { getDataInfo } from "./stores/auth/slice";

dayjs.locale("vi");

localConfig.locale("vi");

const App: React.FC = () => {
  const dispatch = useDispatch();

  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  useEffect(() => {
    const storedValue = localStorage.getItem("horizontalLayout");
    dispatch(setHorizontal(storedValue ? JSON.parse(storedValue) : true));
    const loginData =
      localStorage.getItem("loginData") || sessionStorage.getItem("loginData");
    if (loginData) dispatch(getDataInfo());
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("horizontalLayout", JSON.stringify(horizontal));
  }, [horizontal]);

  useEffect(() => {
    const handleOnline = () => {
      notification.success({
        message: "Kết nối mạng đã được khôi phục",
        description: "Bạn đã kết nối lại thành công.",
        placement: "topRight",
        duration: 3,
        showProgress: true,
        closable: true,
        pauseOnHover: false,
      });
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.classList.add("hide");

      setTimeout(() => {
        loader.remove();
      }, 900);
    }
  }, []);

  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "#2883f6",
          colorText: "#202224",
          borderRadius: 5,
          fontFamily: "Lexend, sans-serif",
          fontSize: 14,
        },
      }}
      typography={{
        style: {
          margin: 0,
        },
      }}
    >
      <BrowserRouter>
        <div>
          <MessageToastManager>
            <ErrorResetManager>
              <Routes>
                {publicRoutes.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <PublicLayout>
                          <Page />
                        </PublicLayout>
                      }
                    />
                  );
                })}
                {privateRoutes.map((route, index) => {
                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <AuthMiddleware>
                          <PrivateLayout>
                            <Page />
                          </PrivateLayout>
                        </AuthMiddleware>
                      }
                    />
                  );
                })}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ErrorResetManager>
          </MessageToastManager>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
