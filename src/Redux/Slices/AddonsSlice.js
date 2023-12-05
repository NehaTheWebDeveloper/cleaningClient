
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  addOnsItems: [],
  addOnsTotalItems: 0,
  addOnsIsTableLoading: false,
  addOnsPage: 1,
  addOnsRowsPerPage: 10,
  addOnsSearchValue: "",
  addOnsSortValue: { field: "createdAt", value: "DESC" },
  addOnsStatusFilter: "All",
  addOnsSearchQuery: "",
};

const AddOnsSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
  
    setAddOnsStatusFilter: (state, action) => {
      state.addOnsStatusFilter = action.payload;
    },
    setAddOnsSearchQuery: (state, action) => {
      state.addOnsSearchQuery = action.payload;
    },
    setAddOnsItems: (state, action) => {
      state.addOnsItems = action.payload;
    },
    setAddOnsPage: (state, action) => {
      state.addOnsPage = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setAddOnsRowsPerPage: (state, action) => {
      state.addOnsRowsPerPage = action.payload;
      state.page = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setAddOnsSearchValue: (state, action) => {
      state.addOnsSearchValue = action.payload;
      state.page = 1;
    },
    setAddOnsSortValue: (state, action) => {
      state.addOnsSortValue = action.payload;
      state.page = 1;
    },
    setAddOnsTotalItems: (state, action) => {
      state.addOnsTotalItems = action.payload;
    },
    setAddOnsIsTableLoading: (state, action) => {
      state.addOnsIsTableLoading = action.payload;
    },
  },
});
export const {
    setAddOnsIsTableLoading,
    setAddOnsTotalItems,
    setAddOnsSortValue,
    setAddOnsRowsPerPage,
    setAddOnsPage,
    setAddOnsItems,
    setAddOnsSearchQuery,
    setAddOnsStatusFilter,
    setAddOnsSearchValue
} = AddOnsSlice.actions;


export default AddOnsSlice.reducer;
