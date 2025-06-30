import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import CustomizeColumnDisplay from "./CustomizeColumnDisplay";
import HandleColumnSelector, {
  ColumnsConfigType,
} from "./handleColumnSelector";
import { TableProps } from "antd/lib";
import CustomPagination from "../CustomPagination";
import { SorterResult } from "antd/es/table/interface";
import { CLASSNAME } from "../../constants/UI";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { handleCheckLockAction } from "../../utils/lockActionUtils";
import { useExcelData } from "../../hooks/useExcelData";
import { getInitialConfigColumns } from "./columnConfig";
import { resizableComponents } from "./ResizeComponents";
import { ExportExcelQuery } from "../../models/base/excel_model";
import { PaginationProps, SummaryData } from "../../models/base/api_response_model";
import ExpandIconButton from "../button/ExpandIconButton";
import NoData from "../display/NoData";
import DropdownAction from "../dropdown/ActionMenu";

export interface TableColumnConfigProps extends Omit<TableProps, "pagination"> {
  columns: ColumnsConfigType;
  tableKey: string;
  fileQuery?: ExportExcelQuery;
  dataLength?: number;

  dataSource: any[];
  loading: boolean;
  pagination?: PaginationProps | null;
  itemName: string;
  hasFilter?: boolean;
  detailTableColumns?: ColumnsConfigType;
  actionWidth?: number | string;
  showTotal?: boolean;
  hasSummary?: boolean;
  setPage: (page: number) => void;
  setPageLimit: (pageLimit: number) => void;
  onEdit?: (record: any) => void;
  onUpdate?: (record: any) => void;
  onDelete?: (record: any) => void;
  onEntry?: (record: any) => void;
  onExit?: (record: any) => void;
  onReconciliation?: (record: any) => void;
  onPayment?: (record: any) => void;
  onSort?: (field: string | undefined, type: string | undefined) => void;
}

export interface ObjectTableProps
  extends Omit<TableColumnConfigProps, "columns" | "tableKey" | "itemName"> {
  onApprove?: (record: any) => void;
  onShowProgress?: (record: any) => void;
  summaryData?: SummaryData | null;
}

const TableColumnConfig: React.FC<TableColumnConfigProps> = ({
  columns,
  tableKey,
  fileQuery,
  dataLength,
  dataSource,
  loading,
  pagination,
  itemName,
  detailTableColumns,
  actionWidth = 60,
  showTotal = true,
  hasSummary = false,
  setPage,
  setPageLimit,
  onEdit,
  onUpdate,
  onDelete,
  onEntry,
  onExit,
  onReconciliation,
  onPayment,
  onSort,
  ...rest
}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [configColumns, setConfigColumns] = useState<ColumnsConfigType>(() =>
    getInitialConfigColumns(columns, tableKey)
  );
  const [finalColumns, setFinalColumns] = useState<TableColumnsType>([]);
  const indexCheck = hasSummary ? 1 : 0;

  const { exportCurrentExcel } = useExcelData(fileQuery);

  const length = dataSource?.length;
  const increasedLength = hasSummary ? 1 : 0;

  const hasAcction =
    !!onEdit ||
    !!onUpdate ||
    !!onDelete ||
    !!onEntry ||
    !!onExit ||
    !!onReconciliation ||
    !!onPayment ||
    !!fileQuery ||
    !!fileQuery;

  const { info } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const getFinalColumns = (cols: ColumnsConfigType): TableColumnsType => [
    {
      title: (
        <>
          STT
          <span
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              height: "60%",
              borderLeft: "1px solid #d9d9d9",
            }}
          />
        </>
      ),
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 50,
      onHeaderCell: () => {
        return {
          style: { position: "relative", textAlign: "center" },
        } as unknown as React.HTMLAttributes<any>;
      },
      render: (value: any, record: any, index: number) =>
        record.isSummary
          ? ""
          : value !== undefined
          ? value
          : ((pagination?.currentPage || 1) - 1) * (pagination?.size || 10) +
              index +
              1 -
              increasedLength || "",
    },
    ...cols
      .filter((col) => !col.is_hide)
      .map((col, index) => ({
        ...col,
        ellipsis: true,
        onHeaderCell: () => {
          return {
            width: col.width,
            // style: { textAlign: "center" },
            onResize: handleResize(index),
          } as unknown as React.HTMLAttributes<any>;
        },
      })),
    {
      title: (
        <CustomizeColumnDisplay
          title={"Tùy chỉnh cột hiển thị"}
          content={
            <HandleColumnSelector
              columns={configColumns}
              onConfigColumns={(sortedColumns) => {
                const openColumnKeys = sortedColumns.map((col: any) => ({
                  key: col.key,
                  is_hide: col.is_hide,
                }));

                localStorage.setItem(tableKey, JSON.stringify(openColumnKeys));
                setConfigColumns(sortedColumns);
              }}
              onResetColumns={() => {
                const openColumnKeys = columns.map((col: any) => ({
                  key: col.key,
                  is_hide: col.is_hide,
                }));

                localStorage.setItem(tableKey, JSON.stringify(openColumnKeys));
                setConfigColumns(columns);
              }}
            />
          }
        />
      ),
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "right",
      render(_: any, record: any) {
        const isLockAction = handleCheckLockAction(record, info);
        return (
          <div className="flex w-full justify-end">
            <div
              onClick={(e) => e.stopPropagation()}
              className="hover:text-white w-[46px] flex justify-center h-[32px]"
            >
              {record.isSummary ||
              record.isLockAction ||
              !hasAcction ||
              record.isChild ||
              (isLockAction &&
                !fileQuery &&
                !fileQuery) ? (
                <></>
              ) : (
                <DropdownAction
                  onEdit={
                    onEdit && !isLockAction ? () => onEdit(record) : undefined
                  }
                  onDelete={
                    onDelete && !isLockAction
                      ? () => onDelete(record)
                      : undefined
                  }
                />
              )}
            </div>
          </div>
        );
      },
      ellipsis: true,
    },
  ];

  const handleResize =
    (index: number) =>
    (
      e: React.SyntheticEvent<Element>,
      { size }: { size: { width: number } }
    ) => {
      setConfigColumns((prev) => {
        const next = [...prev];
        next[index] = {
          ...next[index],
          width: size.width,
        };
        return next;
      });
    };

  useEffect(() => {
    setConfigColumns(getInitialConfigColumns(columns, tableKey));
  }, [columns, tableKey]);

  useEffect(() => {
    const cols = getFinalColumns(configColumns);
    setFinalColumns(
      dataSource.length > indexCheck &&
        (dataSource[indexCheck].children || dataSource[indexCheck].details)
        ? [
            // {
            //   key: "expanded",
            //   className: "hidden-column",
            //   fixed: "left",
            //   width: 10,
            //   ellipsis: true,
            // },
            ...cols,
          ]
        : cols
    );

    const openColumnKeys = configColumns.map((col) => ({
      key: col.key,
      is_hide: col.is_hide,
      width: col.width,
    }));

    localStorage.setItem(tableKey, JSON.stringify(openColumnKeys));
  }, [configColumns]);

  const onChange: TableProps<any>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const { field, order } = sorter as SorterResult;
    onSort?.(
      field ? field.toString() : undefined,
      order ? order.replace("end", "").toUpperCase() : undefined
    );
  };

  return (
    <Table
      rowKey="key"
      components={resizableComponents}
      columns={finalColumns}
      dataSource={dataSource}
      pagination={false}
      loading={loading}
      footer={() =>
        pagination === undefined ? (
          <></>
        ) : (
          <CustomPagination
            pagination={pagination}
            itemName={itemName}
            length={dataLength || length - increasedLength}
            showTotal={showTotal}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        )
      }
      onChange={onChange}
      tableLayout="fixed"
      locale={{
        emptyText: (
          <div
            style={{
              height: `${"calc(100vh - 26rem)"}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NoData />
          </div>
        ),
      }}
      expandable={
        dataSource.length > indexCheck &&
        (dataSource[indexCheck].children || dataSource[indexCheck].details)
          ? {
              expandIcon: (props) => <ExpandIconButton {...props} />,
              expandedRowKeys,
              onExpand: (expanded: boolean, record: any) => {
                const key = record.key;
                setExpandedRowKeys((prev) =>
                  expanded ? [...prev, key] : prev.filter((k) => k !== key)
                );
              },
              ...(detailTableColumns
                ? {
                    expandedRowRender: (record) => (
                      <Table
                        columns={detailTableColumns}
                        dataSource={record.details || []}
                        pagination={false}
                        rowKey="key"
                        className="ml-8"
                        size="small"
                        scroll={{
                          x: "max-content",
                        }}
                      />
                    ),
                  }
                : {}),
              expandIconColumnIndex: 0,
            }
          : undefined
      }
      className={CLASSNAME.table}
      scroll={{
        x: "max-content",
        y: "max-content",
      }}
      rowClassName={(record: any) => {
        const classes = [];
        if (record.isSummary) classes.push("font-semibold summary-row");
        if (record.isParent) classes.push("font-medium");
        if (record.is_closed) classes.push("closed-row");
        return classes.join(" ");
      }}
      {...rest}
    />
  );
};

export default TableColumnConfig;
