import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IoPersonCircleOutline } from "react-icons/io5";
import CMPBreadCrumbs from "../../Components/CMPBreadCrumps/CMPBreadCrumps";
import {
  setUserPage,
  setUserSearchQuery,
} from "../../Redux/Slices/UserSlice";
import CMPPagination from "../../Components/CMPPagination/CMPPagination";
import CMPTable from "../../Components/CMPTable/CMPTable";

const breadcrumbs = [
  {
    label: "Dashboard",
    path: "/",
    icon: <IoPersonCircleOutline />,
  },
  {
    label: "Users",
    path: "/users",
    icon: <IoPersonCircleOutline />,
  },
];

const UserListing = ({ columns, rows }) => {
  const dispatch = useDispatch();

  const {
    userPage,
    userRowsPerPage,
    userTotalItems,
    userIsTableLoading,
    userSearchQuery,
  } = useSelector((state) => state.users);
  // Handle page change
  const handlePageChange = (newPage) => {
    // Update Redux state with the new page
    dispatch(setUserPage(newPage));
  };
  const rowCount = rows?.length;
  // Calculate the visibleData within your page component
  const startIndex = (userPage - 1) * userRowsPerPage;
  const endIndex = Math.min(startIndex + userRowsPerPage, rowCount);
  const visibleData = rows.slice(startIndex, endIndex);

  const handleSearchOperation = (e) => {
    dispatch(setUserSearchQuery(e.target.value));
  };
  const statusFilteredData = () => {
    let filteredRows = visibleData;

    if (userSearchQuery) {
      filteredRows = filteredRows.filter((row) =>
        Object.values(row)
          .filter((value) => typeof value === "string")
          .some((value) =>
            value.toLowerCase().includes(userSearchQuery.toLowerCase())
          )
      );
    }
    return filteredRows;
  };
  const FilteredRows = statusFilteredData();
  const FormSectionHeading = ({ children }) => {
    return (
      <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
        {children}
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {/* Breadcrumbs */}
      <div className="flex justify-between items-center">
        <CMPBreadCrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className=" flex flex-col overflow-auto rounded bg-white gap-2">
        <FormSectionHeading>Users</FormSectionHeading>
        <div className=" flex items-center justify-end">
          <input
            className="w-full focus:outline-none md:w-auto px-2 py-1 bg-gray-200 text-gray-700 rounded-md border border-gray-300"
            placeholder="Search"
            value={userSearchQuery}
            onChange={handleSearchOperation}
          />
        </div>
        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <CMPTable
            columns={columns}
            rows={FilteredRows}
            isLoading={userIsTableLoading}
          />
        </div>
        <div className="flex justify-end">
          <CMPPagination
            totalItems={userTotalItems}
            itemsPerPage={userRowsPerPage}
            currentPage={userPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserListing;
