import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RxPencil1 } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import CMPMenu from "../../Components/CMPMenu/CMPMenu";
import ConfirmationModal from "../../Components/CMPConfirmationDialog/CMPConfirmationDialog";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import AddOnsListing from "./AddOnsListing";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CMPLoader from "../../Components/CMPLoader/CMPLoader";

const AddOnsListingWrapper = () => {
  const navigate = useNavigate();
  const { addOnsItems } = useSelector((state) => state.addOns);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);
  const handleDelete = async (id) => {
    // Set the itemToDelete and open the confirmation dialog
    setItemToDelete(id);
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Delete the service type document
      await deleteDoc(doc(db, "addons", itemToDelete));
      toast.success("Add-On Deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting Addon Type:", error);
      toast.error("Unable to delete AddOns Type", {
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
          //   navigate(`/banner/${row._id}/edit`);
          navigate(`/addons/edit/${row.id}`);
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
        const rowIndex = addOnsItems.indexOf(row);
        // Calculate the serial number based on the row's position
        const sno = rowIndex + 1;
        return <div>{sno}</div>;
      },
    },
    {
      field: "addons",
      headerName: "Addons",
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
      field: "perVisit",
      headerName: "Per Visit",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      flex: "flex-[1_1_0%]",
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

  const text = "Are you sure you want to delete this item ?";
  return (
    <>
      {loading?<div><CMPLoader/></div>:<AddOnsListing columns={columns} rows={addOnsItems} />}
      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onCancel={handleDeleteCanceled}
          text={text}
          onConfirm={handleDeleteConfirmed}
          task="Delete"
        />
      )}
    </>
  );
};

export default AddOnsListingWrapper;
