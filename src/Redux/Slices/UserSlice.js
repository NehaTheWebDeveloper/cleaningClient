
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userItems: [],
  userTotalItems: 0,
  userIsTableLoading: false,
  userPage: 1,
  userRowsPerPage: 4,
  userSearchValue: "",
  userSortValue: { field: "createdAt", value: "DESC" },
  userStatusFilter: "All",
  userSearchQuery: "",
};

const UsersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
  
    setUserStatusFilter: (state, action) => {
      state.userStatusFilter = action.payload;
    },
    setUserSearchQuery: (state, action) => {
      state.userSearchQuery = action.payload;
    },
    setUserItems: (state, action) => {
      state.userItems = action.payload;
    },
    setUserPage: (state, action) => {
      state.userPage = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setUserRowsPerPage: (state, action) => {
      state.userRowsPerPage = action.payload;
      state.userPage = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setUserSearchValue: (state, action) => {
      state.userSearchValue = action.payload;
      state.userPage = 1;
    },
    setUserSortValue: (state, action) => {
      state.userSortValue = action.payload;
      state.userPage = 1;
    },
    setUsersTotalItems: (state, action) => {
      state.userTotalItems = action.payload;
    },
    setUserIsTableLoading: (state, action) => {
      state.userIsTableLoading = action.payload;
    },
  },
});
export const {
  setPage,
  setUserPage,
  setUserItems,
  setRowsPerPage,
  setSearchValue,
  setSortValue,
  setUsersTotalItems,
  setUserIsTableLoading,
  setStatusFilter,
  setUserSearchQuery,
} = UsersSlice.actions;


export default UsersSlice.reducer;
