import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores";

import { resetErrors as resetErrorsPhase } from "../stores/operations/phase/slice";
// import { resetErrors as resetErrorsProduce } from "../stores/operations/produce/slice";
import { resetErrors as resetErrorsPurchase } from "../stores/operations/purchase/slice";
import { resetErrors as resetErrorsSale } from "../stores/operations/sale/slice";

import { resetErrors as resetErrorsProduct } from "../stores/categories/product/slice";
import { resetErrors as resetErrorsProductGroup } from "../stores/categories/product_group/slice";
import { resetErrors as resetErrorsCategory } from "../stores/categories/category/slice";
import { resetErrors as resetErrorsProductType } from "../stores/categories/product_type/slice";
import { resetErrors as resetErrorsLength } from "../stores/categories/length/slice";
import { resetErrors as resetErrorsHairTone } from "../stores/categories/hair_tone/slice";
import { resetErrors as resetErrorsHairQuality } from "../stores/categories/hair_quality/slice";
import { resetErrors as resetErrorsHairType } from "../stores/categories/hair_type/slice";
import { resetErrors as resetErrorsUnit } from "../stores/categories/unit/slice";
import { resetErrors as resetErrorsWarehouse } from "../stores/categories/warehouse/slice";
import { resetErrors as resetErrorsCustomer } from "../stores/categories/customer/slice";
import { resetErrors as resetErrorsSupplier } from "../stores/categories/supplier/slice";

import { resetErrors as resetErrorsEmployee } from "../stores/employee/slice";

type ErrorResetManagerProps = {
  children: React.ReactNode;
};

const ErrorResetManager: React.FC<ErrorResetManagerProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  const errorHandlers = useMemo(
    () => [
      // TODO: Operations
      {
        selector: (state: RootState) => state.Phase.errors,
        reset: resetErrorsPhase,
      },
      // {
      //   selector: (state: RootState) => state.Produce.errors,
      //   reset: resetErrorsProduce,
      // },
      {
        selector: (state: RootState) => state.Purchase.errors,
        reset: resetErrorsPurchase,
      },
      {
        selector: (state: RootState) => state.Sale.errors,
        reset: resetErrorsSale,
      },

      // TODO: Categories
      {
        selector: (state: RootState) => state.Product.errors,
        reset: resetErrorsProduct,
      },
      {
        selector: (state: RootState) => state.ProductGroup.errors,
        reset: resetErrorsProductGroup,
      },
      {
        selector: (state: RootState) => state.Category.errors,
        reset: resetErrorsCategory,
      },
      {
        selector: (state: RootState) => state.ProductType.errors,
        reset: resetErrorsProductType,
      },
      {
        selector: (state: RootState) => state.Length.errors,
        reset: resetErrorsLength,
      },
      {
        selector: (state: RootState) => state.HairTone.errors,
        reset: resetErrorsHairTone,
      },
      {
        selector: (state: RootState) => state.HairQuality.errors,
        reset: resetErrorsHairQuality,
      },
      {
        selector: (state: RootState) => state.HairType.errors,
        reset: resetErrorsHairType,
      },
      {
        selector: (state: RootState) => state.Unit.errors,
        reset: resetErrorsUnit,
      },
      {
        selector: (state: RootState) => state.Warehouse.errors,
        reset: resetErrorsWarehouse,
      },
      {
        selector: (state: RootState) => state.Customer.errors,
        reset: resetErrorsCustomer,
      },
      {
        selector: (state: RootState) => state.Supplier.errors,
        reset: resetErrorsSupplier,
      },

      // TODO: Employee
      {
        selector: (state: RootState) => state.Employee.errors,
        reset: resetErrorsEmployee,
      },
      
    ],
    []
  );

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
