import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingItems: [],
  bookingTotalItems: 0,
  bookingIsTableLoading: false,
  bookingpage: 1,
  bookingRowsPerPage: 10,
  bookingSearchValue: "",
  bookingSortValue: { field: "createdAt", value: "DESC" },
  bookingStatusFilter: "All",
  bookingSearchQuery: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: {
    setBookingStatusFilter: (state, action) => {
      state.bookingStatusFilter = action.payload;
    },
    
    setBookingSearchQuery: (state, action) => {
      state.bookingSearchQuery = action.payload;
    },
    setBookingItems: (state, action) => {
      state.bookingItems = action.payload;
    },
    setBookingPage: (state, action) => {
      state.bookingpage = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setBookingRowsPerPage: (state, action) => {
      state.bookingRowsPerPage = action.payload;
      state.bookingpage = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setBookingSearchValue: (state, action) => {
      state.bookingSearchValue = action.payload;
      state.bookingpage = 1;
    },
    setBookingSortValue: (state, action) => {
      state.bookingSortValue = action.payload;
      state.bookingpage = 1;
    },
    setBookingTotalItems: (state, action) => {
      state.bookingTotalItems = action.payload;
    },
    setBookingIsTableLoading: (state, action) => {
      state.bookingIsTableLoading = action.payload;
    },
  },
});

export const {
  setBookingStatusFilter,
  setBookingSearchQuery,
  setBookingPage,
  setBookingItems,
  setBookingRowsPerPage,
  setBookingSearchValue,
  setBookingSortValue,
  setBookingTotalItems,
  setBookingIsTableLoading,
} = bookingSlice.actions;
export default bookingSlice.reducer;


// export default bookingSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   items: [],
// //   totalItems: 0,
// //   isTableLoading: false,
// //   page: 1,
// //   rowsPerPage: 10,
// //   searchValue: "",
// //   sortValue: { field: 'createdAt', value: 'DESC' },
// //   selectedBannerUpdateId: ""
// // };

// const bannerUpdateSlice = createSlice({
//   name: 'bannerUpdate',
//   initialState,
//   reducers: {
//     setItems: (state, action) => {
//       state.items = action.payload;
//     },
//     setPage: (state, action) => {
//       state.page = action.payload;
//       document.getElementById('scroll-top')?.scrollTo(0, 0);
//     },
//     setRowsPerPage: (state, action) => {
//       state.rowsPerPage = action.payload;
//       state.page = 1;
//       document.getElementById('scroll-top')?.scrollTo(0, 0);
//     },
//     setSearchValue: (state, action) => {
//       state.searchValue = action.payload;
//       state.page = 1;
//     },
//     setSortValue: (state, action) => {
//       state.sortValue = action.payload;
//       state.page = 1;
//     },
//     setTotalItems: (state, action) => {
//       state.totalItems = action.payload;
//     },
//     setIsTableLoading: (state, action) => {
//       state.isTableLoading = action.payload;
//     },
//     setSelectedBannerUpdateId: (state, action) => {
//       state.selectedBannerUpdateId = action.payload;
//     }
//   }
// });

// export const {
//   setItems,
//   setPage,
//   setRowsPerPage,
//   setSearchValue,
//   setSortValue,
//   setTotalItems,
//   setIsTableLoading,
//   setSelectedBannerUpdateId
// } = bannerUpdateSlice.actions;

// export default bannerUpdateSlice.reducer;
