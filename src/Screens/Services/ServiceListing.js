import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CMPPagination from "../../Components/CMPPagination/CMPPagination";
import {
  setServicePage,
  setServiceSearchQuery,
} from "../../Redux/Slices/ServiceSlice";
import CMPTable from "../../Components/CMPTable/CMPTable";

const FormSectionHeading = ({ children }) => {
  return (
    <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl">
      {children}
    </div>
  );
};

const ServiceListing = ({ columns, rows }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    serviceSearchQuery,
    serviceTotalItems,
    serviceIsTableLoading,
    servicePage,
    serviceRowsPerPage,
  } = useSelector((state) => state.services);

  const rowCount = rows?.length;

  // Calculate the visibleData within your page component
  const startIndex = (servicePage - 1) * serviceRowsPerPage;
  const endIndex = Math.min(startIndex + serviceRowsPerPage, rowCount);
  const visibleData = rows.slice(startIndex, endIndex);
  const handleSearchOperation = (e) => {
    dispatch(setServiceSearchQuery(e.target.value));
  };
  const statusFilteredData = () => {
    let filteredRows = visibleData;

    if (serviceSearchQuery) {
      filteredRows = filteredRows.filter((row) =>
        Object.values(row)
          .filter((value) => typeof value === "string")
          .some((value) =>
            value.toLowerCase().includes(serviceSearchQuery.toLowerCase())
          )
      );
    }
    return filteredRows;
  };
  const FilteredRows = statusFilteredData();

  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full overflow-hidden">
      {/* Breadcrumbs */}
      <div className="flex justify-end items-center">
        <div>
          <button
            className="py-2 px-3 rounded bg-graybg text-white w-[150px]"
            onClick={() => navigate("/services/add")}
          >
            Add Services
          </button>
        </div>
      </div>
      <FormSectionHeading>Services</FormSectionHeading>
      <div className="flex flex-col rounded bg-white">
        <div className="flex items-center justify-end pb-1">
          <input
            className="w-full focus:outline-none md:w-auto px-2 py-1 bg-gray-200 text-gray-700 rounded-md border border-gray-300"
            placeholder="Search"
            value={serviceSearchQuery}
            onChange={handleSearchOperation}
          />
        </div>

        {/* Table with scrollable container */}
        <div className="border rounded bg-white overflow-x-auto">
          <CMPTable
            columns={columns}
            rows={FilteredRows}
            isCheckbox={false}
            isLoading={serviceIsTableLoading}
            className="w-full" // Ensure the table takes up full width
          />
        </div>
        <div className="flex items-center text-md justify-end border-slate-300">
          <CMPPagination
            totalItems={serviceTotalItems}
            itemsPerPage={serviceRowsPerPage}
            currentPage={servicePage}
            onPageChange={(newPage) => dispatch(setServicePage(newPage))}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceListing;
