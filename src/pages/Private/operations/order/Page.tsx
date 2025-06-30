import { useState } from "react";
import SearchAdd from "../../../../components/SearchAdd";
import PurchaseTable from "./components/PurchaseTable";
import { CSS } from "../../../../constants/UI";
import { PurchaseData } from "../../../../models/operations/purchase";
import { usePurchaseData } from "../../../../hooks/operations/usePurchaseData";
import ModalDelete from "../../../../components/modal/ModalDelete";
import CustomTitle from "../../../../layout/Private/header/components/Title";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../../stores";
import { privateRoutesName } from "../../../../constants/routerName";
import FilterPopover, {
  emptyFilterState,
} from "../../../../components/filters/Filter";
import {
  ClearFilterModel,
  FiltersModel,
} from "../../../../models/base/filter_propover_model";
import {
  getSessionEndDate,
  getSessionStartDate,
} from "../../../../utils/dateUtils";
import DateRangeFilter from "../../../../components/button/DateRangeFilter";
import ActiveFilterTags from "../../../../components/filters/ActiveFilterTags";

const PurchasePage: React.FC = () => {
  const nagigate = useNavigate();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(20);
  const [keyword, setKeyword] = useState<string>("");
  const [rowData, setRowData] = useState<PurchaseData | undefined>(undefined);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortType, setSortType] = useState<string | undefined>(undefined);
  const [startAt, setStartAt] = useState<string | undefined>(
    getSessionStartDate()
  );
  const [endAt, setEndAt] = useState<string | undefined>(getSessionEndDate());

  const [clearFilter, setClearFilter] = useState<ClearFilterModel | null>(null);
  const [filters, setFilters] = useState<FiltersModel>(emptyFilterState);
  const hasActiveFilters = Object.values(filters).some(
    (items) => items.length > 0
  );

  const { purchaseData, loading, pagination, deletePurchase } = usePurchaseData(
    {
      keyword,
      page,
      size: pageLimit,
      sortBy: sortField,
      sortType,
      filters,
      startAt,
      endAt,
      onCloseModal: () => {
        setOpenDelete(false);
      },
    }
  );

  const { horizontal } = useSelector(
    (state: RootState) => state.Client,
    shallowEqual
  );

  const handleSearch = (value: string) => {
    setPage(1);
    setKeyword(value);
  };

  const handleOpenAddModal = () => {
    nagigate(privateRoutesName.operations.purchase.add);
  };

  const handleOpenEditModal = (record: PurchaseData) => {
    nagigate(privateRoutesName.operations.purchase.update + `?id=${record.id}`);
  };

  const handleOpenDeleteModal = (record: PurchaseData) => {
    setOpenDelete(true);
    setRowData(record);
  };

  const handleDelete = () => {
    if (!rowData || !rowData.id) return;
    deletePurchase(rowData.id);
  };

  return (
    <div className="flex flex-col h-full ">
      <div
        className="flex flex-col flex-1 overflow-y-hidden "
        style={CSS.container}
      >
        <div className="flex flex-col h-full bg-white rounded-normal ">
          <div className="flex flex-row gap-4">
            {horizontal ? (
              <div className="hidden lg:flex mr-2">
                <CustomTitle />
              </div>
            ) : (
              <></>
            )}
            <div className="flex gap-3 justify-between sm:overflow-open overflow-x-auto scrollbar-hide">
              <DateRangeFilter
                onRangeChange={(
                  startAt: string | undefined,
                  endAt: string | undefined
                ) => {
                  setStartAt(startAt);
                  setEndAt(endAt);
                }}
              />
            </div>
            <FilterPopover
              filtersToUse={["supplier", "employee", "product", "warehouse"]}
              clearFilter={clearFilter}
              onFilterChange={setFilters}
            />
            <SearchAdd
              onSearch={handleSearch}
              onOpenAddModal={handleOpenAddModal}
            />
          </div>
          <ActiveFilterTags
            filters={filters}
            onRemove={(filter) => setClearFilter(filter)}
          />
          <div
            className="flex flex-col mt-3"
            style={{
              height: "calc(100% - 44px)",
            }}
          >
            <PurchaseTable
              dataSource={purchaseData}
              loading={loading}
              pagination={pagination}
              setPage={setPage}
              setPageLimit={setPageLimit}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          </div>
        </div>

        <ModalDelete
          open={openDelete}
          setOpen={setOpenDelete}
          accept={handleDelete}
        />
      </div>
    </div>
  );
};

export default PurchasePage;
