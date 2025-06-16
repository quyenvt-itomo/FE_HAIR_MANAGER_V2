/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores";
import { message } from "antd";
import { TypeMessage } from "../enums/typeMessage";

import { clearMessage as clearMessagePhase } from "../stores/operations/phase/slice";
// import { clearMessage as clearMessageProduce } from "../stores/operations/produce/slice";
import { clearMessage as clearMessagePurchase } from "../stores/operations/purchase/slice";

import { clearMessage as clearMessageProduct } from "../stores/categories/product/slice";
import { clearMessage as clearMessageProductGroup } from "../stores/categories/product_group/slice";
import { clearMessage as clearMessageCategory } from "../stores/categories/category/slice";
import { clearMessage as clearMessageProductType } from "../stores/categories/product_type/slice";
import { clearMessage as clearMessageLength } from "../stores/categories/length/slice";
import { clearMessage as clearMessageHairTone } from "../stores/categories/hair_tone/slice";
import { clearMessage as clearMessageHairQuality } from "../stores/categories/hair_quality/slice";
import { clearMessage as clearMessageHairType } from "../stores/categories/hair_type/slice";
import { clearMessage as clearMessageUnit } from "../stores/categories/unit/slice";
import { clearMessage as clearMessageWarehouse } from "../stores/categories/warehouse/slice";
import { clearMessage as clearMessageCustomer } from "../stores/categories/customer/slice";
import { clearMessage as clearMessageSupplier } from "../stores/categories/supplier/slice";

import { clearMessage as clearMessageEmployee } from "../stores/employee/slice";

type MessageToastManagerProps = {
  children: React.ReactNode;
};

const MessageToastManager: React.FC<MessageToastManagerProps> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const messages = useMemo(
    () => [
      // TODO: Operations
      {
        selector: (state: RootState) => state.Phase.message,
        clear: clearMessagePhase,
      },
      // {
      //   selector: (state: RootState) => state.Produce.message,
      //   clear: clearMessageProduce,
      // },
      {
        selector: (state: RootState) => state.Purchase.message,
        clear: clearMessagePurchase,
      },

      // TODO: Categories
      {
        selector: (state: RootState) => state.Product.message,
        clear: clearMessageProduct,
      },
      {
        selector: (state: RootState) => state.ProductGroup.message,
        clear: clearMessageProductGroup,
      },
      {
        selector: (state: RootState) => state.Category.message,
        clear: clearMessageCategory,
      },
      {
        selector: (state: RootState) => state.ProductType.message,
        clear: clearMessageProductType,
      },
      {
        selector: (state: RootState) => state.Length.message,
        clear: clearMessageLength,
      },
      {
        selector: (state: RootState) => state.HairTone.message,
        clear: clearMessageHairTone,
      },
      {
        selector: (state: RootState) => state.HairQuality.message,
        clear: clearMessageHairQuality,
      },
      {
        selector: (state: RootState) => state.HairType.message,
        clear: clearMessageHairType,
      },
      {
        selector: (state: RootState) => state.Unit.message,
        clear: clearMessageUnit,
      },
      {
        selector: (state: RootState) => state.Warehouse.message,
        clear: clearMessageWarehouse,
      },
      {
        selector: (state: RootState) => state.Customer.message,
        clear: clearMessageCustomer,
      },
      {
        selector: (state: RootState) => state.Supplier.message,
        clear: clearMessageSupplier,
      },

      // TODO: Employee
      {
        selector: (state: RootState) => state.Employee.message,
        clear: clearMessageEmployee,
      },
    ],
    []
  );

  // Component con để xử lý từng thông báo
  const MessageHandler: React.FC<{
    selector: (state: RootState) => any;
    clear: () => { type: string };
  }> = ({ selector, clear }) => {
    const messageState = useSelector(selector);

    useEffect(() => {
      if (messageState && messageState.type !== TypeMessage.none) {
        if (messageState.type === TypeMessage.error) {
          message.error(messageState.message);
        } else if (messageState.type === TypeMessage.success) {
          message.success(messageState.message);
        }
        dispatch(clear());
      }
    }, [messageState, dispatch, clear]);

    return null;
  };

  return (
    <>
      {messages.map(({ selector, clear }, index) => (
        <MessageHandler key={index} selector={selector} clear={clear} />
      ))}
      {children}
    </>
  );
};

export default React.memo(MessageToastManager);
