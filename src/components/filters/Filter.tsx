import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import { COLORS } from "../../constants/UI";
import { IconFilter } from "../icon/Filter";
import { IconRemove } from "../icon/Remove";
import ProductSelect from "../multiple_selects/ProductSelect";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../stores";
import { WarehouseData } from "../../models/categories/warehouse";
import { EmployeeData } from "../../models/employee";
import EmployeeSelect from "../multiple_selects/EmployeeSelect";
import { ClearFilterModel, FiltersModel, FilterType } from "../../models/base/filter_propover_model";
import { ProductData } from "../../models/categories/product";
import SupplierSelect from "../multiple_selects/SupplierSelect";
import { SupplierData } from "../../models/categories/supplier";
import CustomerSelect from "../multiple_selects/CustomerSelect";
import { CustomerData } from "../../models/categories/customer";
import WarehouseSelect from "../multiple_selects/WarehouseSelect";

const getDropdownStyle = (isMobile: boolean): React.CSSProperties => ({
  display: isMobile ? "hidden" : undefined,
  position: isMobile ? "fixed" : "absolute",
  top: isMobile ? "20vh" : "36px",
  left: isMobile ? "2.5vw" : 0,
  backgroundColor: "white",
  padding: "16px",
  border: "0.5px solid " + COLORS.BORDER,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: isMobile ? "95vw" : "450px",
  zIndex: 1000,
  borderRadius: "8px",
});

interface FilterPopoverProps {
  filtersToUse?: FilterType[];
  clearFilter?: ClearFilterModel | null;
  onFilterChange: (filters: FiltersModel) => void;
}

export const emptyFilterState: FiltersModel = {
  product: [],
  supplier: [],
  customer: [],
  warehouse: [],
  employee: [],
};

const FilterPopover: React.FC<FilterPopoverProps> = ({
  filtersToUse = [
    "product",
    "supplier",
    "customer",
    "warehouse",
    "employee",
  ],
  clearFilter,
  onFilterChange,
}) => {
  const [focusedFilter, setFocusedFilter] = useState<FilterType | null>(null);
  const [filterActive, setFilterActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(emptyFilterState);
  const [containerOpen, setContainerOpen] = useState(false);
  const [blur, setBlur] = useState(true);

  const getValuesFromSelectedFilters = (key: FilterType): number[] => {
    return selectedFilters?.[key]?.map((item) => item.value) || [];
  };

  const filterComponents: Record<
    FilterType,
    { label: string; component: JSX.Element }
  > = {
    product: {
      label: "Hàng hóa",
      component: (
        <ProductSelect
          placeholder=""
          defaultData={selectedFilters.product.map(
            (item) =>
              ({
                id: item.value,
                name: item.text,
              } as ProductData)
          )}
          onFocus={() => setFocusedFilter("product")}
          onBlur={() => setFocusedFilter(null)}
          value={getValuesFromSelectedFilters("product")}
          onChangeData={(values) => handleSelectChange("product", values)}
        />
      ),
    },
    employee: {
      label: "Nhân viên",
      component: (
        <EmployeeSelect
          placeholder=""
          defaultData={selectedFilters.employee.map(
            (item) =>
              ({
                id: item.value,
                name: item.text,
              } as EmployeeData)
          )}
          onFocus={() => setFocusedFilter("employee")}
          onBlur={() => setFocusedFilter(null)}
          value={getValuesFromSelectedFilters("employee")}
          onChangeData={(values) => handleSelectChange("employee", values)}
        />
      ),
    },
    supplier: {
      label: "Nhà cung cấp",
      component: (
        <SupplierSelect
          placeholder=""
          defaultData={selectedFilters.supplier.map(
            (item) =>
              ({
                id: item.value,
                name: item.text,
              } as SupplierData)
          )}
          onFocus={() => setFocusedFilter("supplier")}
          onBlur={() => setFocusedFilter(null)}
          value={getValuesFromSelectedFilters("supplier")}
          onChangeData={(values) => handleSelectChange("supplier", values)}
        />
      ),
    },
    customer: {
      label: "Khách hàng",
      component: (
        <CustomerSelect
          placeholder=""
          defaultData={selectedFilters.customer.map(
            (item) =>
              ({
                id: item.value,
                name: item.text,
              } as CustomerData)
          )}
          onFocus={() => setFocusedFilter("customer")}
          onBlur={() => setFocusedFilter(null)}
          value={getValuesFromSelectedFilters("customer")}
          onChangeData={(values) => handleSelectChange("customer", values)}
        />
      ),
    },
    warehouse: {
      label: "Kho",
      component: (
        <WarehouseSelect
          placeholder=""
          defaultData={selectedFilters.warehouse.map(
            (item) =>
              ({
                id: item.value,
                name: item.text,
              } as WarehouseData)
          )}
          onFocus={() => setFocusedFilter("warehouse")}
          onBlur={() => setFocusedFilter(null)}
          value={getValuesFromSelectedFilters("warehouse")}
          onChangeData={(values) => handleSelectChange("warehouse", values)}
        />
      ),
    },
  };

  const filterMap = filtersToUse.map((key) => ({
    key,
    ...filterComponents[key],
  }));

  const { isMobile } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );
  const dropDownStype = getDropdownStyle(isMobile);

  useEffect(() => {
    if (
      !clearFilter ||
      !selectedFilters[clearFilter.key]?.some(
        (filter) => filter.value === clearFilter.value
      )
    )
      return;

    const updatedFilters = { ...selectedFilters };
    updatedFilters[clearFilter.key] = updatedFilters[clearFilter.key]?.filter(
      (filter) => filter.value !== clearFilter.value
    );

    if (!updatedFilters[clearFilter.key]?.length) {
      updatedFilters[clearFilter.key] = []; // Use an empty array instead of undefined
    }

    const isActive = Object.values(updatedFilters).some(
      (filterArr) => filterArr.length > 0
    );
    setFilterActive(isActive);
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }, [clearFilter]);

  const handleSubmit = () => {
    const isActive = Object.values(selectedFilters).some(
      (filterArr) => filterArr.length > 0
    );
    setFilterActive(isActive);
    onFilterChange(selectedFilters);
    handleClose();
  };

  const handleSelectChange = (key: FilterType, values: any[]) => {
    const formatedValues: {
      value: number;
      text: string;
    }[] = values.map((val) => ({
      value: val.id,
      text: val.name || val.name || val.code,
    }));

    setSelectedFilters((prev) => ({
      ...prev,
      [key]: formatedValues,
    }));
  };

  const handleRemoveFilterClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedFilters(emptyFilterState);
    setFilterActive(false);
    onFilterChange(emptyFilterState);
    handleClose();
  };

  useEffect(() => {
    handleRemoveFilterClick();
  }, [location.pathname]);

  const toggleContainerVisibility = () => {
    setBlur(containerOpen);
    setContainerOpen(!containerOpen);
  };

  const handleClose = () => {
    setBlur(true);
    setTimeout(() => setContainerOpen(false), 100);
  };

  return (
    <div style={{ position: "relative", height: "32px" }}>
      <Button
        onClick={toggleContainerVisibility}
        className="flex flex-row gap-3 min-w-20 font-light text-sm !px-3 h-8 rounded-[3px]"
      >
        <IconFilter color={filterActive ? "#006EC4" : undefined} />
        {filterActive ? (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              width: "fit-content",
              alignItems: "center",
              color: "#006EC4",
            }}
          >
            Đang lọc
            <span
              style={{
                cursor: "pointer",
                marginLeft: "8px",
                color: "red",
                height: "24px",
                width: "24px",
              }}
              onClick={handleRemoveFilterClick}
            >
              <IconRemove />
            </span>
          </span>
        ) : (
          <span style={{ color: "#A6A6A6" }}>Lọc</span>
        )}
      </Button>

      {containerOpen && (
        <div style={dropDownStype} className="wscale-up-ver-top">
          <div className="flex justify-between items-center font-light px-1">
            <span>Điều kiện lọc</span>
            <button onClick={handleClose}>
              <IconRemove />
            </button>
          </div>
          <div className="flex flex-col gap-7 px-1 py-4 pb-12">
            {filterMap.map((filter) => {
              const hasValue =
                selectedFilters[filter.key]?.length > 0 ||
                focusedFilter === filter.key;

              return (
                <div key={filter.label} className="flex flex-col relative">
                  {filter.component}
                  <span
                    className={`${
                      hasValue ? "top-[-15px]" : "top-[8px] text-gray-400"
                    } text-sm font-light absolute transition-all left-2 duration-200 bg-white px-1 pointer-events-none`}
                  >
                    {filter.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              className="rounded-[3px] font-light"
              onClick={handleRemoveFilterClick}
            >
              Bỏ lọc
            </Button>
            <Button
              type={"primary"}
              className="rounded-[3px] font-light"
              onClick={handleSubmit}
            >
              Áp dụng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPopover;
