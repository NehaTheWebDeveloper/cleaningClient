import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import CMPMenu from "../../Components/CMPMenu/CMPMenu";
import ServiceListing from "./ServiceListing";
import ConfirmationModal from "../../Components/CMPConfirmationDialog/CMPConfirmationDialog";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CMPLoader from "../../Components/CMPLoader/CMPLoader";

const ServiceListingWrapper = () => {
  const navigate = useNavigate();
  const { serviceItems } = useSelector((state) => state.services);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);


 
  const handleDelete = async (id) => {
    // Set the itemToDelete and open the confirmation dialog
    setItemToDelete(id);
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Delete the service type document
      await deleteDoc(doc(db, "serviceType", itemToDelete));
      toast.success("Service Type Deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting Service Type:", error);
      toast.error("Unable to delete Service Type", {
        position: "top-right",
      });
    } finally {
      // Close the confirmation dialog
      setIsConfirmationOpen(false);
    }
  };

  const handleDeleteCanceled = () => {
    // Close the confirmation dialog without deleting
    setIsConfirmationOpen(false);
    setItemToDelete(null);
  };
  const getActionOptions = (row) => {
    return [
      {
        label: (
          <div className="flex gap-2 items-center text-secondary-main cursor-pointer">
            <RxPencil1 className="text-lg" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/services/edit/${row.id}`);
        },
      },
      {
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold cursor-pointer">
            <MdDeleteOutline className="text-lg" /> Delete
          </div>
        ),
        onClick: () => {
          // Show the confirmation modal and set the itemToDelete
          handleDelete(row.id);
        },
      },
    ];
  };
  // Table Columns
  const columns = [
    {
      field: "sno",
      headerName: "Sno",
      flex: "flex-[0_0_50px]", // Adjust the width as needed
      renderCell: (row, index) => {
        // Get the index of the current row within your dataset
        const rowIndex = serviceItems.indexOf(row);
        // Calculate the serial number based on the row's position
        const sno = rowIndex + 1;
        return <div>{sno}</div>;
      },
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "price",
      headerName: "Price",
      flex: "flex-[1_1_0%]",
      // $34.99
      renderCell: (row) => {
        return <div>${row?.price}</div>;
      },
    },
    {
      field: "time",
      headerName: "Time",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => {
        return <div>{row?.price}Hr</div>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => {
        const points = row?.description.split(",").map((point, index) => (
          <span key={index}>
            {point}
            <br />
          </span>
        ));

        return <ul>{points}</ul>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      flex: "flex-[0_0_100px]",
      renderCell: (row) => {
        const options = getActionOptions(row);

        return <CMPMenu options={options} />;
      },
    },
  ];

  const text = "Are you sure you want to delete this item ?";


  return (
    <>
      <ServiceListing columns={columns} rows={serviceItems} />
      {isConfirmationOpen && (
        <ConfirmationModal
        isOpen={isConfirmationOpen}
        text = {text}
        task ="Delete"
        onCancel={handleDeleteCanceled}
        onConfirm={handleDeleteConfirmed}
      />
      )}
    </>
  );
};

export default ServiceListingWrapper;
