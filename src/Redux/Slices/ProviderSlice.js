import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  providerItems: [],
  providerTotalItems: 0,
  providerIsTableLoading: false,
  providerPage: 1,
  providerRowsPerPage: 10,
  providerSearchValue: "",
  providerSortValue: { field: "createdAt", value: "DESC" },
  providerStatusFilter: "All",
  providerSearchQuery: "",
  providerItemsChanged:""
};

const ProvidersSlice = createSlice({
  name: "providers",
  initialState: initialState,
  reducers: {
  
    setProviderStatusFilter: (state, action) => {
      state.providerStatusFilter = action.payload;
    },
    setProviderSearchQuery: (state, action) => {
      state.providerSearchQuery = action.payload;
    },
    setProviderItems: (state, action) => {
      state.providerItems = action.payload;
    },
    setProviderItemsChanged: (state, action) => {
      state.providerItemsChanged = action.payload;
    },
    setProviderPage: (state, action) => {
      state.providerPage = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setProviderRowsPerPage: (state, action) => {
      state.providerRowsPerPage = action.payload;
      state.providerPage = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);

    },
    setProviderSearchValue: (state, action) => {
      state.providerSearchValue = action.payload;
      state.page = 1;
    },
    setProviderSortValue: (state, action) => {
      state.providerSortValue = action.payload;
      state.page = 1;
    },
    setProviderTotalItems: (state, action) => {
      state.providerTotalItems = action.payload;
    },
    setProviderIsTableLoading: (state, action) => {
      state.providerIsTableLoading = action.payload;
    },
  },
});

export const {
  setProviderIsTableLoading,
  setProviderTotalItems,
  setProviderSortValue,
  setProviderSearchValue,
  setProviderRowsPerPage,
  setProviderPage,
  setProviderItems,
  setProviderSearchQuery,
  setProviderStatusFilter,
  setProviderItemsChanged

} = ProvidersSlice.actions;

export default ProvidersSlice.reducer;
