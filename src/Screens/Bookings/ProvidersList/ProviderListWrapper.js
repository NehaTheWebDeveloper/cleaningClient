import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { BiCheckDouble } from "react-icons/bi";

import ProviderList from "./ProviderList";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import { doc,  updateDoc } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProviderListWrapper = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { uid } = useParams();
  const { bookingItems } = useSelector((state) => state.booking);
  const [providerIds, setProviderIds] = useState({});
  const [assignedProvider, setAssignedProvider] = useState(null);

  // Load assigned provider from local storage when component mounts
  useEffect(() => {
    const storedProviderId = localStorage.getItem(`assignedProvider_${uid}`);
    if (storedProviderId) {
      setAssignedProvider(storedProviderId);
    }
  }, [uid]);

  const fetchProviderIds = async () => {
    try {
      let singleBookingData = bookingItems.find((item) => item.id === uid);
      if (!singleBookingData) {
        setLoading(true);

      } else {
        setProviderIds(singleBookingData?.providerIds);
        setLoading(false);
     
      }
    } catch (error) {
      console.error("Error fetching booking by ID:", error);
      toast.error("Unable to fetch booking", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchProviderIds();
  }, [bookingItems, uid]);

  const { providerItems } = useSelector((state) => state.providers);
  const providerIdsArray = Array.isArray(providerIds)
    ? providerIds
    : [providerIds];

  const filteredProviders = providerItems.filter((provider) =>
    providerIdsArray.includes(provider.id)
  );

  const handleAssign = async (bookingId, name, providerId) => {
    try {
      const bookingDocRef = doc(db, "bookings", bookingId);
      // const bookingSnapshot = await getDoc(bookingDocRef);


      let newAssignedProvider = null;
      if (assignedProvider !== providerId) {
        // If a different provider is clicked, assign the new provider
        await updateDoc(bookingDocRef, {
          assign: name,
          assignedStatus: "assigned",
        });
        newAssignedProvider = providerId;
      } else {
        // If the same provider is clicked again, unassign them
        await updateDoc(bookingDocRef, {
          assign: null,
          status: "unassigned",
        });

      }

      // Update the state with the new assigned provider
      setAssignedProvider(newAssignedProvider);
      toast.success("Assigned status changed successfully!", {
        position: "top-right",
      });

      // Store assigned provider in local storage
      localStorage.setItem(`assignedProvider_${uid}`, newAssignedProvider);
    } catch (error) {
      toast.error("Unable to change Assignee Status", {
        position: "top-right",
      });
      console.error("Error updating booking:", error);
    }
  };

  const getActionOptions = (row) => {
    return [
      {
        label: (
          <div className="flex gap-2 items-center text-secondary-main">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate("/dashboard");
        },
      },
      {
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
            <MdDeleteOutline className="text-lg" /> Delete
          </div>
        ),
        onClick: () => {
          navigate("/dashboard");
        },
      },
    ];
  };

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: "flex-[2_1_0%]",
    },
    {
      field: "address",
      headerName: "Address",
      flex: "flex-[2_2_0%]",
      renderCell: (row) => {
        return (
          <>
            {row?.addressLine}
            {row?.streetAddress}
          </>
        );
      },
    },
    {
      field: "city",
      headerName: "City",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "state",
      headerName: "State",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "assign",
      headerName: "Assign",
      flex: "flex-[0_0_100px]",
      renderCell: (row) => {
        const isAssigned = assignedProvider === row.id;
        return (
          <button
            onClick={() => handleAssign(uid, row.firstName, row.id)}
            className={`cursor-pointer border m-1 rounded bg-graybg text-white w-[90px]  text-[11px] ${
              isAssigned ? "bg-green-500" : "bg-blue-500 "
            }`}
          >
            {isAssigned ? (
              <div className="flex justify-center ">
                {" "}
                <BiCheckDouble className="text-[20px]" />
              </div>
            ) : (
              <div> Assign</div>
            )}
          </button>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <CMPLoader />
      ) : (
        <ProviderList columns={columns} rows={filteredProviders} />
      )}
    </>
  );
};

export default ProviderListWrapper;
