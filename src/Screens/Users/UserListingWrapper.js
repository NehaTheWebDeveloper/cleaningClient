import React, { useEffect, useState } from "react";

import CMPMenu from "../../Components/CMPMenu/CMPMenu";
import UserListing from "./UserListing";
import { useSelector } from "react-redux";

import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Components/CMPConfirmationDialog/CMPConfirmationDialog";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import CMPLoader from "../../Components/CMPLoader/CMPLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserListingWrapper = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { userItems } = useSelector((state) => state.users);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleDelete = async (id) => {
    // Set the itemToDelete and open the confirmation dialog
    setItemToDelete(id);
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      // Delete the service type document
      await deleteDoc(doc(db, "users", itemToDelete));
      toast.success("User deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting Service Type:", error);
      toast.error("Unable to delete User", {
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
  useEffect(() => {}, [userItems]);

  const getActionOptions = (row) => {
    return [
      // {
      //   label: (
      //     <div className="flex gap-2 items-center text-secondary-main">
      //       <RxPencil1 className="text-lg" /> Edit
      //     </div>
      //   ),
      //   onClick: () => {
      //       navigate(`/users/edit/${row.id}`);
      //   },
      // },
      {
        label: (
          <div className="flex gap-2 items-center text-red-600 font-semibold">
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
  const columns = [
    {
      field: "sno",
      headerName: "Sno",
      flex: "flex-[0_0_50px]", // Adjust the width as needed
      renderCell: (row, index) => {
        const rowIndex = userItems.indexOf(row);
        // Calculate the serial number based on the row's position
        const sno = rowIndex + 1;
        return <div>{sno}</div>;
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "email",
      headerName: "Email",
      flex: "flex-[1_1_0%]",
    },
    {
      field: "mobile",
      headerName: "Mobile",
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
              onClick={() => navigate(`/user/details/${row.id}`)}
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  const text = "Are you sure you want to delete this item ?";

  return (
    <>
      {loading ? (
        <CMPLoader />
      ) : (
        <>
          <UserListing columns={columns} rows={userItems} />
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
      )}
    </>
  );
};

export default UserListingWrapper;
