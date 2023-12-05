import { useEffect, useState } from "react";
import PageRoutes from "./PageRoutes";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "./Database/Firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserIsTableLoading,
  setUserItems,
  setUsersTotalItems,
} from "./Redux/Slices/UserSlice";
import {
  setBookingIsTableLoading,
  setBookingItems,
  setBookingTotalItems,
} from "./Redux/Slices/BookingSlice";
import {
  setProviderIsTableLoading,
  setProviderItems,
  setProviderTotalItems,
} from "./Redux/Slices/ProviderSlice";
import {
  setServiceIsTableLoading,
  setServiceItems,
  setServicesTotalItems,
} from "./Redux/Slices/ServiceSlice";
import {
  setAddOnsIsTableLoading,
  setAddOnsItems,
  setAddOnsTotalItems,
} from "./Redux/Slices/AddonsSlice";
import CMPLoader from "./Components/CMPLoader/CMPLoader";
import { ToastContainer } from "react-toastify";
import { loginUser, setAuthLoading } from "./Redux/Slices/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          loginUser({
            uid: authUser.uid,
            username: authUser.displayName,
            email: authUser.email,
          })
        );
        dispatch(setAuthLoading(false));
      } else {
        dispatch(setAuthLoading(false));
      }
    });
  }, []);

  const fetchUsersData = () => {
    const usersRef = collection(db, "users");
    dispatch(setUserIsTableLoading(true));

    try {
      const usersData = onSnapshot(usersRef, (querySnapshot) => {
        const users = [];
        // dispatch(setUserIsTableLoading(true));

        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        const totalItems = querySnapshot.size;

        dispatch(setUserItems(users));
        dispatch(setUsersTotalItems(totalItems));
        dispatch(setUserIsTableLoading(false));
      });

      return usersData; // Return the unsubscribe function to stop listening when the component unmounts
    } catch (error) {
      // dispatch(setUserIsTableLoading(false));
      console.error("Error fetching users data:", error);
      dispatch(setUserIsTableLoading(false));

      // You can handle the error in a way that makes sense for your application.
    }
  };

  const fetchBookingsData = () => {
    const bookingsRef = collection(db, "bookings");
    dispatch(setBookingIsTableLoading(true));

    try {
      const bookingData = onSnapshot(bookingsRef, (querySnapshot) => {
        const bookings = [];
        querySnapshot.forEach((doc) => {
          bookings.push({ id: doc.id, ...doc.data() });
        });
        const totalItems = querySnapshot.size;
        dispatch(setBookingItems(bookings));
        dispatch(setBookingTotalItems(totalItems));
        dispatch(setBookingIsTableLoading(false));
      });

      return bookingData;
    } catch (error) {
      console.error("Error fetching data:", error);
      // You can handle the error in a way that makes sense for your application, e.g., display an error message to the user.
    }
  };

  const fetchProvidersData = () => {
    const providersRef = collection(db, "providers");
    dispatch(setProviderIsTableLoading(true));

    try {
      const providerData = onSnapshot(providersRef, (querySnapshot) => {
        const providers = [];
        querySnapshot.forEach((doc) => {
          providers.push({ id: doc.id, ...doc.data() });
        });
        const totalItems = querySnapshot.size;

        dispatch(setProviderItems(providers));
        dispatch(setProviderTotalItems(totalItems));
        dispatch(setProviderIsTableLoading(false));
      });

      return providerData;
    } catch (error) {
      console.error("Error fetching providers data:", error);
      dispatch(setProviderIsTableLoading(false));

      // You can handle the error in a way that makes sense for your application.
    }
  };

  const fetchServicessData = () => {
    const servicesRef = collection(db, "serviceType");
    dispatch(setServiceIsTableLoading(true));

    try {
      const servicesData = onSnapshot(servicesRef, (querySnapshot) => {
        const services = [];
        querySnapshot.forEach((doc) => {
          services.push({ id: doc.id, ...doc.data() });
        });
        const totalItems = querySnapshot.size;

        dispatch(setServiceItems(services));
        dispatch(setServicesTotalItems(totalItems));
        dispatch(setServiceIsTableLoading(false));
      });

      return servicesData;
    } catch (error) {
      console.error("Error fetching services data:", error);
      dispatch(setServiceIsTableLoading(false));
    }
  };

  const fetchAddonsData = () => {
    const addonsRef = collection(db, "addons");
    dispatch(setAddOnsIsTableLoading(true));

    try {
      const addOnData = onSnapshot(addonsRef, (querySnapshot) => {
        const addOnsData = [];
        querySnapshot.forEach((doc) => {
          addOnsData.push({ id: doc.id, ...doc.data() });
        });
        const totalItems = querySnapshot.size;

        dispatch(setAddOnsItems(addOnsData));
        dispatch(setAddOnsTotalItems(totalItems));
        dispatch(setAddOnsIsTableLoading(false));
      });

      return addOnData;
    } catch (error) {
      console.error("Error fetching addons data:", error);
      dispatch(setAddOnsIsTableLoading(false));

      // You can handle the error in a way that makes sense for your application.
    }
  };
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      fetchUsersData();
      fetchBookingsData();
      fetchProvidersData();
      fetchServicessData();
      fetchAddonsData();
    }
  }, [dispatch, user]);
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <>
      {isLoading ? (
        <div>
          <CMPLoader />
        </div>
      ) : (
        <PageRoutes />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
