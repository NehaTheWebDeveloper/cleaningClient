
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  serviceItems: [],
  serviceTotalItems: 0,
  serviceIsTableLoading: false,
  servicePage: 1,
  serviceRowsPerPage: 5,
  serviceSearchValue: "",
  serviceSortValue: { field: "createdAt", value: "DESC" },
  serviceStatusFilter: "All",
  serviceSearchQuery: "",
};

const UsersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
  
    setServiceStatusFilter: (state, action) => {
      state.serviceStatusFilter = action.payload;
    },
    setServiceSearchQuery: (state, action) => {
      state.serviceSearchQuery = action.payload;
    },
    setServiceItems: (state, action) => {
      state.serviceItems = action.payload;
    },
    setServicePage: (state, action) => {
      state.servicePage = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setServiceRowsPerPage: (state, action) => {
      state.serviceRowsPerPage = action.payload;
      state.servicePage = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setServiceSearchValue: (state, action) => {
      state.serviceSearchValue = action.payload;
      state.servicePage = 1;
    },
    setServiceSortValue: (state, action) => {
      state.serviceSortValue = action.payload;
      state.servicePage = 1;
    },
    setServicesTotalItems: (state, action) => {
      state.serviceTotalItems = action.payload;
    },
    setServiceIsTableLoading: (state, action) => {
      state.serviceIsTableLoading = action.payload;
    },
  },
});
export const {
    setServiceIsTableLoading,
    setServicesTotalItems,
    setServiceSortValue,
    setServiceRowsPerPage,
    setServicePage,
    setServiceItems,
    setServiceSearchQuery,
    setServiceStatusFilter,
} = UsersSlice.actions;


export default UsersSlice.reducer;
