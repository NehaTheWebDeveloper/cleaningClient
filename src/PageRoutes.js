import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Screens/Dashboard/Dashboard";
import React, { useEffect } from "react";

import MainLayout from "./Layouts/MainLayout";
import Login from "./Screens/Login/Login";
import BookingListingWrapper from "./Screens/Bookings/BookingWrapper";
import BookingDetailsWrapper from "./Screens/Bookings/BookingDetails/BookingDetailsWrapper";
import ProviderListWrapper from "./Screens/Bookings/ProvidersList/ProviderListWrapper";
import ProviderListingWrapper from "./Screens/Providers/ProviderListingWrapper";
import ProviderAddWrapper from "./Screens/Providers/Add/ProviderAddWrapper";
import UserListingWrapper from "./Screens/Users/UserListingWrapper";
import ServicesAddWrapper from "./Screens/Services/AddServices/ServicesAddWrapper";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import ServiceListingWrapper from "./Screens/Services/ServiceListingWrapper";
import EditServiceWrapper from "./Screens/Services/EditServices/EditServiceWrapper";
import AddOnsListingWrapper from "./Screens/AddOns/AddOnsListingWrapper";
import AddAddonsWrapper from "./Screens/AddOns/AddAddons/AddAddonsWrapper";
import EditAddonsWrapper from "./Screens/AddOns/EditAddons/EditAddonsWrapper";
import ProviderDetailsWrapper from "./Screens/Providers/ProviderDetails/ProviderDetailsWrapper";
import EditProvidersWrapper from "./Screens/Providers/EditProviders/EditProvidersWrapper";
import EditUserWrapper from "./Screens/Users/EditUsers/EditUserWrapper";
import UserDetailsWrapper from "./Screens/Users/UserDetails/UserDetailsWrapper";
import Payment from "./Screens/Payment/Payment";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<Login />} />

          <Route
            path={"/"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={Dashboard} />
              </MainLayout>
            }
          />

          <Route
            path={"/users"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={UserListingWrapper} />
              </MainLayout>
            }
          />
          <Route
            path="/user/details/:uid"
            element={
              <MainLayout>
                <ProtectedRoutes Components={UserDetailsWrapper} />
              </MainLayout>
            }
          />
          <Route
            path="/users/edit/:uid"
            element={
              <MainLayout>
                <ProtectedRoutes Components={EditUserWrapper} />
              </MainLayout>
            }
          />

          <Route
            path={"/bookings"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={BookingListingWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/bookings/details/:uid"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={BookingDetailsWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/bookings/:uid/providerslist"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={ProviderListWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/payment"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={Payment} />
              </MainLayout>
            }
          />

          <Route
            path={"/providers"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={ProviderListingWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/providers/add"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={ProviderAddWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/providers/details/:uid"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={ProviderDetailsWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/providers/edit/:uid"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={EditProvidersWrapper} />
              </MainLayout>
            }
          />

          <Route
            path={"/services"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={ServiceListingWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/services/add"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={ServicesAddWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/services/edit/:uid"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={EditServiceWrapper} />
              </MainLayout>
            }
          />

          <Route
            path={"/addons"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={AddOnsListingWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/addons/add"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={AddAddonsWrapper} />
              </MainLayout>
            }
          />
          <Route
            path={"/addons/edit/:uid"}
            element={
              <MainLayout>
                <ProtectedRoutes Components={EditAddonsWrapper} />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
