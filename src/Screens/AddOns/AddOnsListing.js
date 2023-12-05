import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import CMPPagination from "../../Components/CMPPagination/CMPPagination";
import {
  setAddOnsPage,
  setAddOnsSearchQuery,
} from "../../Redux/Slices/AddonsSlice";
import CMPTable from "../../Components/CMPTable/CMPTable";

const AddOnsListing = ({ columns, rows }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addOnsState = useSelector((state) => state.addOns);
  const {
    addOnsPage,
    addOnsTotalItems,
    addOnsIsTableLoading,
    addOnsRowsPerPage,
    addOnsItems,
    addOnsSearchQuery,
  } = addOnsState;
  // Calculate the visibleData within your page component
  const rowCount = rows?.length;

  const startIndex = (addOnsPage - 1) * addOnsRowsPerPage;
  const endIndex = Math.min(startIndex + addOnsRowsPerPage, rowCount);
  const visibleData = rows.slice(startIndex, endIndex);
  const handleSearchOperation = (e) => {
    dispatch(setAddOnsSearchQuery(e.target.value));
  };
  const statusFilteredData = () => {
    let filteredRows = visibleData;

    if (addOnsSearchQuery) {
      filteredRows = filteredRows.filter((row) =>
        Object.values(row)
          .filter((value) => typeof value === "string")
          .some((value) =>
            value.toLowerCase().includes(addOnsSearchQuery.toLowerCase())
          )
      );
    }
    return filteredRows;
  };

  const FormSectionHeading = ({ children }) => {
    return (
      <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
        {children}
      </div>
    );
  };
  const FilteredRows = statusFilteredData();
  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-end">
        <div>
          <button
            className="py-2 px-3 rounded bg-graybg text-white w-[150px]"
            onClick={() => navigate("/addons/add")}
          >
            Add AddOns
          </button>
        </div>
      </div>
      <FormSectionHeading> Addons</FormSectionHeading>

      <div className=" flex items-center justify-end">
        <input
          className="w-full focus:outline-none md:w-auto px-2 py-1 bg-gray-200 text-gray-700 rounded-md border border-gray-300"
          placeholder="Search"
          value={addOnsSearchQuery}
          onChange={handleSearchOperation}
        />
      </div>

      {/* Table */}
      <div className="border flex flex-col grow overflow-auto rounded bg-white">
        <CMPTable
          columns={columns}
          rows={FilteredRows}
          isCheckbox={false}
          isLoading={addOnsIsTableLoading}
        />
      </div>
      <div className="flex justify-end">
        <CMPPagination
          totalItems={addOnsTotalItems}
          itemsPerPage={addOnsRowsPerPage}
          currentPage={addOnsPage}
          onPageChange={(newPage) => dispatch(setAddOnsPage(newPage))}
        />
      </div>
    </div>
  );
};

export default AddOnsListing;
