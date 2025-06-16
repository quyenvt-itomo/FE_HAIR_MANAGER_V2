import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "../stores";
import LoadingScreen from "./LoadingScreen";
import { setIsCheckUnAuthor } from "../stores/auth/slice";
import { message } from "antd";
import { AUTH_MESSAGES } from "../constants/message/auth";

type AuthMiddlewareProps = {
    children: React.ReactNode;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = window.location;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hideLoadingScreen, setHideLoadingScreen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const { loginData, isCheckUnAuthor } = useSelector(
        (state: RootState) => ({
            loginData: state.Auth.loginData,
            isCheckUnAuthor: state.Auth.isCheckUnAuthor,
        }),
        shallowEqual
    );

    useEffect(() => {
        const loginDataOld = localStorage.getItem("loginData");
        const checkAccess = () => {
            // if (!loginData && !loginDataOld) {
            //     navigate("/login");
            //     return;
            // }

            // if (isCheckUnAuthor) {
            //     dispatch(setIsCheckUnAuthor(false));

            //     messageApi.open({
            //         type: "error",
            //         content: AUTH_MESSAGES.UNAUTHOR,
            //     });

            //     setTimeout(() => {
            //         navigate("/login");
            //     }, 2000);
            //     return;
            // }

            setHideLoadingScreen(true);
            setTimeout(() => setIsLoading(false), 2500);
        };

        checkAccess();
    }, [pathname, loginData, isCheckUnAuthor, navigate]);

    if (isLoading) {
        return (
            <LoadingScreen isActive={hideLoadingScreen} onFinish={() => {}} />
        );
    }

    return <>{children}</>;
};

export default AuthMiddleware;
