import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingDetailitems: [],
  bookingDetailTotalItems: 0,
  bookingDetailIsTableLoading: false,
  bookingDetailPage: 1,
  bookingDetailRowsPerPage: 4,
  bookingDetailSearchValue: "",
  bookingDetailSortValue: { field: "createdAt", value: "DESC" },
  bookingDetailStatusFilter: "All",
  bookingDetailSearchQuery: "",
};

const bookingDetailsSlice = createSlice({
  name: " bookingDetailDetails",
  initialState: initialState,
  reducers: {
    setStatusBookingDetailFilter: (state, action) => {
      state.bookingDetailStatusFilter = action.payload;
    },
    setSearchBookingDetailQuery: (state, action) => {
      state.bookingDetailSearchQuery = action.payload;
    },
    setBookingDetailItems: (state, action) => {
      state.bookingDetailitems = action.payload;
    },
    setBookingDetailPage: (state, action) => {
      state.bookingDetailPage = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setBookingDetailRowsPerPage: (state, action) => {
      state.bookingDetailRowsPerPage = action.payload;
      state.page = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setBookingDetailSearchValue: (state, action) => {
      state.bookingDetailSearchValue = action.payload;
      state.page = 1;
    },
    setBookingDetailSortValue: (state, action) => {
      state.bookingDetailSortValue = action.payload;
      state.page = 1;
    },
    setBookingDetailTotalItems: (state, action) => {
      state.bookingDetailTotalItems = action.payload;
    },
    setBookingDetailIsTableLoading: (state, action) => {
      state.bookingDetailIsTableLoading = action.payload;
    },
  },
});

export const {
  setStatusBookingDetailFilter,
  setSearchBookingDetailQuery,
  setBookingDetailItems,
  setBookingDetailPage,
  setBookingDetailRowsPerPage,
  setBookingDetailSearchValue,
  setBookingDetailTotalItems,
  setBookingDetailIsTableLoading,
} = bookingDetailsSlice.actions;
export default bookingDetailsSlice.reducer;
