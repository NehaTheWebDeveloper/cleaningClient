import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import BookingListing from "./BookingListing";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import ConfirmationModal from "../../Components/CMPConfirmationDialog/CMPConfirmationDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CMPLoader from "../../Components/CMPLoader/CMPLoader";

const BookingListingWrapper = () => {
  const navigate = useNavigate();
  const { bookingItems } = useSelector((state) => state.booking);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);
  const getActionOptions = (row) => {
    return [
      // {
      //   label: (
      //     <div className="flex gap-2 items-center text-secondary-main border p-1 cursor-pointer" onClick={()=>navigate(`/bookings/${row.id}`)}>
      //       <RxPencil1 className="text-lg" /> Edit
      //     </div>
      //   ),

      // },
      {
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold cursor-pointer"  
         onClick={()=>handleDelete(row.id)}
          >
            <MdDeleteOutline className="text-lg " /> Delete
          </div>
        ),
        
      },
    ];
  };
  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmationOpen(true);
  };
  const handleDeleteCanceled = () => {
    setIsConfirmationOpen(false);
    setItemToDelete(null);
  };
  const handleDeleteConfirmed = async () => {
    try {
      // Delete the service type document
      await deleteDoc(doc(db, "bookings", itemToDelete));
      toast.success("Booking Deleted  successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting Booking:", error);
      toast.error("Unable to delete Booking", {
        position: "top-right",
      });
    } finally {
      // Close the confirmation dialog
      setIsConfirmationOpen(false);
    }
  };
  // Table Columns
  const columns = [
    {
      field: "sno",
      headerName: "Sno",
      flex: "flex-[0_0_50px]", // Adjust the width as needed
      renderCell: (row, index) => {
        // Get the index of the current row within your dataset
        const rowIndex = bookingItems.indexOf(row);
        // Calculate the serial number based on the row's position
        const sno = rowIndex + 1;
        return <div>{sno}</div>;
      },
    },

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
      field: "status",
      headerName: "Status",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => {
        return (
          <div className="underline cursor-pointer text-blue-800">
            {row.status}
          </div>
        );
      },
    },
    {
      field: "payment",
      headerName: "Payment",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "assign",
      headerName: "Assign",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => {
        return (
          <div className=" cursor-pointer text-blue-800">
            {row.assign ? row.assign : "Not Assigned"}
          </div>
        );
      },
    },
    {
      field: "detail",
      headerName: "Details",
      flex: "flex-[0_0_100px]",

      renderCell: (row) => {
        return (
          <div
            onClick={() => navigate(`/bookings/details/${row.id || "N/A"}`)}
            className="underline cursor-pointer text-blue-800"
          >
            View
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      flex: "flex-[0_0_100px]",
      renderCell: (row) => {
        const options = getActionOptions(row);

        return (
          <>
            <div className="flex items-center justify-between gap-2">
              {options.map((option, id) => {
                return <div>{option.label}</div>;
              })}
            </div>
          </>
        );
        // <CMPMenu options={options} />;
      },
    },
  ];
  const text = "Are you sure you want to delete this item ?"

  return (
    <>
      {loading ?<div><CMPLoader/></div>:<BookingListing columns={columns} rows={bookingItems} />}
      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onCancel={handleDeleteCanceled}
          onConfirm={handleDeleteConfirmed}
        text = {text}
        task ="Delete"


        />
      )}
    </>
  );
};

export default BookingListingWrapper;
