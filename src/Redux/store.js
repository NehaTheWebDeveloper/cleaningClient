import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./Slices/AuthSlice"
import bookingSlice from "./Slices/BookingSlice"
import ProvidersSlice from './Slices/ProviderSlice'
import UsersSlice from './Slices/UserSlice'
import BookingDetailsSlice from "./Slices/BookingDetailsSlice"
import ServicesSlice from "./Slices/ServiceSlice"
import AddOnsSlice from "./Slices/AddonsSlice"




export const store = configureStore({
  reducer: {
      auth:authSlice,
      booking:bookingSlice,
      providers:ProvidersSlice,
      BookingDetails:BookingDetailsSlice,
      users:UsersSlice,
      services:ServicesSlice,
      addOns:AddOnsSlice
  },
})
