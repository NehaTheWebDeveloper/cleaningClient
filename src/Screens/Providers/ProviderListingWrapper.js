import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import CMPMenu from "../../Components/CMPMenu/CMPMenu";
import ProviderListing from "./ProvidersListing";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import ConfirmationModal from "../../Components/CMPConfirmationDialog/CMPConfirmationDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CMPLoader from "../../Components/CMPLoader/CMPLoader";

const ProviderListingWrapper = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { providerItems } = useSelector((state) => state.providers);
console.log(providerItems,"providerItems")
  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsConfirmationOpen(true);
  };
  const getActionOptions = (row) => {
    return [
      {
        label: (
          <div className="flex gap-2 items-center text-secondary-main cursor-pointer">
            <RxPencil1 className="text-lg cursor-pointer" /> Edit
          </div>
        ),
        onClick: () => {
          navigate(`/providers/edit/${row.id}`);
        },
      },
      {
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold cursor-pointer">
            <MdDeleteOutline className="text-lg " /> Delete
          </div>
        ),
        onClick: () => {
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
        // Get the index of the urrent row within your dataset
        const rowIndex = providerItems.indexOf(row);
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
      flex: "flex-[1_1_0%]",
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[2_1_0%]",
      className: "min-w-[100px] bg-red-200",
      renderCell: (row) => {
        
        return <div className="min-w-[110px] "> {row?.email}</div>;
      },
    },

    {
      field: "state",
      headerName: "State",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "view",
      headerName: "Details",
      flex: "flex-[1_1_0%]",
      renderCell: (row) => {
        return (
          <>
            <div
              className="underline cursor-pointer text-blue-800 "
              onClick={() => navigate(`/providers/details/${row.id}`)}
            >
              View
            </div>
          </>
        );
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

  //   const filteredRows = filterRows();
  const handleDeleteConfirmed = async () => {
    try {
      // Delete the service type document
      await deleteDoc(doc(db, "providers", itemToDelete));
      toast.success("Provider Deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting Provider:", error);
      toast.error("Unable to delete Provider", {
        position: "top-right",
      });
    } finally {
      // Close the confirmation dialog
      setIsConfirmationOpen(false);
    }
  };
  const handleDeleteCanceled = () => {
    setIsConfirmationOpen(false);
    setItemToDelete(null);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 100);
  // }, []);
  const text = "Are you sure you want to delete this item ?";

  return (
    <>
    {/* {
      loading ? <div><CMPLoader/></div> : */}
      <ProviderListing columns={columns} rows={providerItems} />
    {/* } */}

      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          text={text}
          onCancel={handleDeleteCanceled}
          onConfirm={handleDeleteConfirmed}
          task="Delete"
        />
      )}
    </>
  );
};

export default ProviderListingWrapper;
