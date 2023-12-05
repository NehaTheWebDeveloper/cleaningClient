import React, { useState, useEffect } from "react";
import CMPBreadCrumbs from "../../Components/CMPBreadCrumps/CMPBreadCrumps";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSelector} from "react-redux";
import CMPLoader from "../../Components/CMPLoader/CMPLoader";

const breadcrumbs = [
  {
    label: "Dashboard",
    path: "/",
    icon: <IoPersonCircleOutline />,
  },
  {
    label: "All Enquiries",
    path: "/allEnquiries",
    icon: <IoPersonCircleOutline />,
  }]
  
const colorMapping = {
  Blue: "#37474F",
  Green: "linear-gradient(45deg, #f1f2f3, #e0e0e0)",
  Teal: "linear-gradient(45deg, #48c9b0, #1abc9c)",
  Purple: "linear-gradient(45deg, #9b59b6, #8e44ad)",
  Gold:  "#78909C",
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { bookingItems } = useSelector((state) => state.booking);
  const { userItems } = useSelector((state) => state.users);
  const { providerItems } = useSelector((state) => state.providers);

  useEffect(() => {
    // Simulate loading for 2 seconds (replace this with your actual API request)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const totalBookingPending = bookingItems?.filter((status) => {
    return status.status === "Pending";
  });

  const totalBookingProcessing = bookingItems?.filter((status) => {
    return status.status === "Processing";
  });
  const totalBookingComplete = bookingItems?.filter((status) => {
    return status.status === "Complete";
  });
  const all = bookingItems.length;
  const completBooking = totalBookingComplete.length;
  const processingBooking = totalBookingProcessing.length;
  const pendingBooking = totalBookingPending.length;

  const DashboardData = [
    {
      title: "Total Bookings",
      value: all,
      color: "Blue",
    },
    {
      title: "Total Bookings Complete",
      value: completBooking,
      color: "Gold",
    },
    {
      title: "Total Bookings Processing",
      value: processingBooking,
      color: "Blue",
    },
    {
      title: "Total Bookings Pending",
      value: pendingBooking,
      color: "Gold",
    },
    {
      title: "Total Providers",
      value: providerItems?.length,
      color: "Blue",
    },
    {
      title: "Total Users",
      value: userItems?.length,
      color: "Gold",
    }]

  return (
    <div className="pt-2 flex flex-col px-4 w-full ">
      <CMPBreadCrumbs breadcrumbs={breadcrumbs} />
      <div className="pt-10">
        <h1 className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl">Dashboard</h1>
      </div>

      <div className="grid lg:grid-cols-12 xs:grid-cols-6 gap-4 pt-10">
        {loading ? (
          <div className="col-span-12 text-center text-gray-500">
            <CMPLoader/>
          </div>
        ) : (
          // Render data once it's loaded
          DashboardData.map((data, i) => (
            <div
              className="lg:col-span-4 xs:col-span-3 p-4 rounded-md h-40 flex-col items-center justify-between text-center transition-transform transform hover:-translate-y-1"
              style={{
                background: colorMapping[data.color],
                transition:
                  "background 0.3s ease-in-out, transform 0.3s ease-in-out",
              }}
              key={i}
            >
              <div className="text-white font-bold text-[55px]">{data.value}</div>
              <div className="text-white font-bold py-2 text-lg">
                {data.title}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
