import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import { TimeRangePickerProps } from "antd/lib";
import { icons } from "../../assets/icons";
import { getSessionEndDate, getSessionStartDate } from "../../utils/dateUtils";

dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek); // Đảm bảo tuần bắt đầu từ Thứ Hai
dayjs.locale("vi");

const { RangePicker } = DatePicker;

const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Hôm nay", value: [dayjs().startOf("day"), dayjs().endOf("day")] },
  {
    label: "Hôm qua",
    value: [
      dayjs().subtract(1, "day").startOf("day"),
      dayjs().subtract(1, "day").endOf("day"),
    ],
  },
  {
    label: "Tuần này",
    value: [
      dayjs().startOf("isoWeek"), // Bắt đầu từ Thứ Hai
      dayjs().endOf("isoWeek"), // Kết thúc vào Chủ Nhật
    ],
  },
  {
    label: "Tuần trước",
    value: [
      dayjs().subtract(1, "week").startOf("isoWeek"),
      dayjs().subtract(1, "week").endOf("isoWeek"),
    ],
  },
  {
    label: "Tháng này",
    value: [dayjs().startOf("month"), dayjs().endOf("month")],
  },
  {
    label: "Tháng trước",
    value: [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ],
  },
];

interface DateRangeFilterProps {
  onRangeChange: (
    start_date: string | undefined,
    end_date: string | undefined
  ) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onRangeChange }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gọi onRangeChange ngay khi component mount
  useEffect(() => {
    onRangeChange(getSessionStartDate(), getSessionEndDate());
  }, []);

  const handleChange = (dates: null | (Dayjs | null)[]) => {
    if (dates && dates[0] && dates[1]) {
      const start = dates[0].format("YYYY-MM-DD");
      const end = dates[1].format("YYYY-MM-DD");

      // Lưu vào sessionStorage
      sessionStorage.setItem("dateRangeStart", start);
      sessionStorage.setItem("dateRangeEnd", end);

      onRangeChange(start, end);
    } else {
      onRangeChange(undefined, undefined);
    }
  };

  return (
    <div
      className="flex items-center px-3 py-2 h-8"
      style={{
        border: `.5px solid #d9d9d9`,
        borderRadius: 3,
        width: isMobile ? 226 : 270,
        backgroundColor: "white",
      }}
    >
      {/* Icon nằm bên trái */}
      {!isMobile && (
        <img src={icons.calender} alt="calendar" className="w-5 h-5 mr-2" />
      )}

      {/* RangePicker */}
      <RangePicker
        style={{ width: 210, border: "none" }}
        format={"DD/MM/YYYY"}
        placeholder={["Từ ngày", "Đến ngày"]}
        suffixIcon={null}
        className="font-light px-0"
        allowClear={false}
        showTime={false}
        presets={isMobile ? undefined : rangePresets}
        onChange={handleChange}
        defaultValue={[
          dayjs(getSessionStartDate()),
          dayjs(getSessionEndDate()),
        ]}
        popupStyle={{ userSelect: "none" }}
        dropdownClassName={isMobile ? "custom-range-picker" : ""}
      />
    </div>
  );
};

export default DateRangeFilter;
