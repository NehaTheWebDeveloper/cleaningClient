import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setBookingPage,
  setBookingSearchQuery,
  setBookingStatusFilter,
} from "../../Redux/Slices/BookingSlice";
import CMPPagination from "../../Components/CMPPagination/CMPPagination";
import CMPTable from "../../Components/CMPTable/CMPTable";


const statusTabs = ["All", "Pending", "Processing", "Complete"];
const BookingListing = ({ columns, rows }) => {
  const dispatch = useDispatch();
  const bookingState = useSelector((state) => state.booking);

  const {
    bookingpage,
    bookingRowsPerPage,
    bookingTotalItems,
    bookingStatusFilter,
    bookingSearchQuery,

  } = bookingState;
  // Calculate the visibleData within your page component PAGINATION
  // 
  const rowCount = rows?.length;
  const startIndex = (bookingpage - 1) * bookingRowsPerPage;
  const endIndex = Math.min(startIndex + bookingRowsPerPage, rowCount);
  const visibleData = rows.slice(startIndex, endIndex);

  const handleStatusChange = (status) => {
    dispatch(setBookingStatusFilter(status));
  };

    const handleSearchOperation = (e) => {
    dispatch(setBookingSearchQuery(e.target.value));
  };
  const statusFilteredData = () => {
    let filteredRows = visibleData;
    if (bookingStatusFilter !== "All") {
      filteredRows = filteredRows.filter((row) => {
        return row.status === bookingStatusFilter;
      });
    }
    if (bookingSearchQuery) {
            filteredRows = filteredRows.filter((row) =>
              Object.values(row)
                .filter((value) => typeof value === "string")
                .some((value) =>
                  value.toLowerCase().includes(bookingSearchQuery.toLowerCase())
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
    

      <div className=" flex flex-col overflow-auto rounded-lg bg-white gap-2">
      <FormSectionHeading>Bookings</FormSectionHeading>
        <div className="flex justify-between items-start  ">
          <div className="grid lg:grid-cols-12  xs:grid-cols-12 items-center justify-between gap-11 xs:gap-3">
            {statusTabs?.map((status) => {
              return (
                <div className="lg:col-span-3 xs:col-span-6 xs:text-xs lg:text-base ">
                <button
                    key={status}
                    className={`${
                      bookingStatusFilter === status
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } px-2 py-1 rounded-md focus:outline-none focus:ring focus:border-blue-300 xs:w-full`}
                    onClick={() => {
                      handleStatusChange(status);
                    }}
                  >
                    {status}
                  </button>
                </div>
              );
            })}
          </div>
          <div className=" flex items-center justify-end">
            <input
              className="w-full focus:outline-none xs:w-[120px] lg:w-full px-2 py-1 bg-gray-200 text-gray-700 rounded-md border border-gray-300"
              placeholder="Search"
              value={bookingSearchQuery}
              onChange={handleSearchOperation}
            />
          </div>
        </div>

        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <CMPTable
            columns={columns}
            rows={FilteredRows}
            isCheckbox={false}
            // isLoading={isTableLoading}
          />
        </div>
        <div className="flex justify-end">
          <CMPPagination
            totalItems={bookingTotalItems}
            itemsPerPage={bookingRowsPerPage}
            currentPage={bookingpage}
            onPageChange={(newPage) => dispatch(setBookingPage(newPage))}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingListing;
