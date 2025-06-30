import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { highlightRow, scrollToBottom } from "../../../../../utils/tableUtils";
import HeaderTooltip from "../../../../../components/table/HeaderTooltip";
import { Button, Input, Table } from "antd";
import { CLASSNAME } from "../../../../../constants/UI";
import { calculateSummaryRow } from "./utils";
import { PurchaseDetailData } from "../../../../../models/operations/purchase";
import { ColumnsType } from "antd/es/table";
import { renderIfDataRow } from "../../../../../components/table/DetailTable";
import InputMoney from "../../../../../components/input/InputMoney";
import InputWeight from "../../../../../components/input/InputWeight";
import formatMoney from "../../../../../utils/formatMoney";
import formatWeight from "../../../../../utils/formatWeight";
import { CloseOutlined } from "@ant-design/icons";

export interface FormInvoiceProps {}

export interface DataType extends Omit<PurchaseDetailData, "id"> {
  key: string;
  [key: string]: any;
}

const DetailTable = forwardRef(({}: FormInvoiceProps, ref) => {
  const [data, setData] = useState<DataType[]>([]);
  const [dataToAdd, setDataToAdd] = useState<DataType[]>([]);
  const [dataToUpdate, setDataToUpdate] = useState<DataType[]>([]);
  const [dataToDelete, setDataToDelete] = useState<number[]>([]);

  const summaryRow = calculateSummaryRow(data);

  useEffect(() => {
    const isFullRow = data.every((item) => item.productName || item.quantity);
    if (isFullRow) handleAddNewRow();
  }, [data]);

  const requiredFields: string[] = ["productName", "quantity", "price"];

  const cleanData = (data: DataType[]) =>
    data
      .map((row) => {
        const hasAnyValue = requiredFields.some(
          (field) => row[field as keyof DataType]
        );

        if (!hasAnyValue) return null;
        return row;
      })
      .filter(Boolean);
  useImperativeHandle(ref, () => ({
    setTable: (data: PurchaseDetailData[]) => {
      if (!data) return;
      setData(
        data.map((item) => ({
          ...item,
          key: item.id?.toString() || "",
        }))
      );
    },
    resetTable: () => {
      setData([]);
      setDataToAdd([]);
      setDataToUpdate([]);
      setDataToDelete([]);
    },
    getData: () => {
      return cleanData(data);
    },
    highlightRow,
    getUpdateData: () => {
      return {
        add: cleanData(dataToAdd),
        update: cleanData(dataToUpdate),
        delete: dataToDelete,
      };
    },
  }));

  const handleAddNewRow = () => {
    const newRow: any = {
      key: Date.now().toString(),
    };

    setData((prev) => [...prev, newRow]);
    scrollToBottom();
  };

  const handleInputChange = <K extends keyof DataType>(
    value: DataType[K],
    key: K,
    index: number
  ) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [key]: value };

    setData(updatedData);

    const item = updatedData[index];

    if (item.id) {
      setDataToUpdate((prev) => {
        const existingIndex = prev.findIndex((d) => d.id === item.id);
        if (existingIndex !== -1) {
          const updatedList = [...prev];
          updatedList[existingIndex] = item;
          return updatedList;
        }
        return [...prev, item];
      });
    } else {
      setDataToAdd((prev) => {
        const existingIndex = prev.findIndex((d) => d.key === item.key);
        if (existingIndex !== -1) {
          const updatedList = [...prev];
          updatedList[existingIndex] = item;
          return updatedList;
        }
        return [...prev, item];
      });
    }
  };

  const handleDeleteRow = (index: number) => {
    const updatedData = [...data];
    const itemToDelete = updatedData[index];

    if (itemToDelete.id !== undefined) {
      setDataToDelete((prev) => [...prev, itemToDelete.id as number]);
    }

    updatedData.splice(index, 1);

    setData(updatedData);

    setDataToAdd((prev) => prev.filter((d) => d.key !== itemToDelete.key));
    setDataToUpdate((prev) => prev.filter((d) => d.id !== itemToDelete.id));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: <HeaderTooltip title="STT" />,
      dataIndex: "stt",
      key: "stt",
      width: 50,
      align: "center",
      render: (_: any, __: any, index: number) => (index ? index : ""),
    },
    {
      title: <HeaderTooltip title="Mã hàng" required />,
      dataIndex: "code",
      key: "code",
      width: 150,
      render: (value: string, _: any, index: number) =>
        renderIfDataRow(
          index,
          () => (
            <Input
              className="h-9"
              value={value}
              onChange={(e) =>
                handleInputChange(e.target?.value, "code", index - 1)
              }
            />
          ),
          value
        ),
    },
    {
      title: <HeaderTooltip title="Tên hàng" required />,
      dataIndex: "productName",
      key: "productName",
      width: 250,
      render: (value: string, _: any, index: number) =>
        renderIfDataRow(index, () => (
          <Input
            className="h-9"
            value={value}
            onChange={(e) =>
              handleInputChange(e.target?.value, "productName", index - 1)
            }
          />
        )),
    },
    {
      title: <HeaderTooltip title="Khối lượng (kg)" required />,
      dataIndex: "quantity",
      key: "quantity",
      width: 180,
      align: "right",
      render: (value: number, _: any, index: number) =>
        renderIfDataRow(
          index,
          () => (
            <InputWeight
              value={value}
              onChange={(value) => handleInputChange(value, "quantity", index - 1)}
            />
          ),
          formatWeight(value)
        ),
    },
    {
      title: <HeaderTooltip title="Đơn giá" required />,
      dataIndex: "price",
      key: "price",
      width: 180,
      align: "right",
      render: (value: number, _: any, index: number) =>
        renderIfDataRow(index, () => (
          <InputMoney
            value={value}
            onChange={(value) => handleInputChange(value, "price", index - 1)}
          />
        )),
    },
    {
      title: <HeaderTooltip title="Thành tiền" />,
      dataIndex: "money",
      key: "money",
      width: 220,
      align: "right",
      render: (value: number, record: DataType, index: number) =>
        renderIfDataRow(
          index,
          () => {
            const { quantity = 0, price = 0 } = record;
            const money = quantity * price;
            return <InputMoney value={money} disabled />;
          },
          formatMoney(value)
        ),
    },
    {
      title: <HeaderTooltip title="Ghi chú" />,
      dataIndex: "note",
      key: "note",
      render: (value: string, record: DataType, index: number) =>
        renderIfDataRow(index, () => (
          <Input
            value={value}
            onChange={(e) => handleInputChange(e.target?.value, "note", index - 1)} className="min-w-72"
          />
        )),
    },
    {
      key: "actions",
      align: "right",
      fixed: "right",
      render: (_: any, record: any, index: number) =>
        renderIfDataRow(index, () =>
          data.length > 1 ? (
            <div className={`flex justify-center w-`}>
              <Button
                className="cursor-pointer h-7 rounded-[6px] border-0"
                onClick={() => handleDeleteRow(index - 1)}
              >
                <CloseOutlined />
              </Button>
            </div>
          ) : (
            <></>
          )
        ),
    },
  ];

  return (
    <div
      className="flex flex-col p-1 mt-1"
      style={{
        border: "1px solid #A2A1A834",
        borderRadius: "3px",
        height: "calc(100% - 120px)",
      }}
    >
      <Table
        columns={columns}
        rowKey="key"
        tableLayout="fixed"
        pagination={false}
        footer={() => <></>}
        className={CLASSNAME.detail_table + " double-floor"}
        dataSource={[summaryRow, ...data]}
        scroll={{
          x: "max-content",
          y: `max-content`,
        }}
        rowClassName={(record: any) =>
          record.isSummary
            ? "editable-row font-semibold leading-[30px]"
            : "editable-row"
        }
      />
    </div>
  );
});

export default DetailTable;
