import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores";

type ErrorResetManagerProps = {
  children: React.ReactNode;
};

const ErrorResetManager: React.FC<ErrorResetManagerProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const errorHandlers = useMemo(() => [], []);

  // Component con xử lý reset từng errors khi có sự thay đổi
  const ErrorHandler: React.FC<{
    selector: (state: RootState) => any;
    reset: () => { type: string };
  }> = ({ selector, reset }) => {
    const errors = useSelector(selector);

    useEffect(() => {
      if (errors) {
        dispatch(reset());
      }
    }, [errors, dispatch, reset]);

    return null;
  };

  return (
    <>
      {errorHandlers.map(({ selector, reset }, index) => (
        <ErrorHandler key={index} selector={selector} reset={reset} />
      ))}
      {children}
    </>
  );
};

export default ErrorResetManager;
