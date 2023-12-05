import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import {  doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useSelector } from "react-redux";
import EditUsers from "./EditUsers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUserWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const { userItems } = useSelector((state) => state.users);
  const navigate = useNavigate();

const userDataById = userItems.find((userItem) => userItem.id === uid);

  const initialValues = {
    name: userDataById?.name || "",
    email: userDataById?.email || "",
    mobile: userDataById?.mobile || "",
    // Initialize other fields here
  };

//    
//     try {
//       const usersData = values;
//       const usersDataCollection = collection(db, "users");

//       // Check if a service with the same name already exists
//       const existingUser = userItems.find((userItem)=>{
//         return (
//             userItem.email ===usersData.email
//         )
//       })

//       if (existingUser) {
//         alert( "Service with the same name already exists" );
//       } else {
//         // Otherwise, add the service
//         const docRef = await addDoc(usersDataCollection, usersData);
//         setLoading(false);
//         alert("Service Type added successfully",
//         );
//         navigate("/services");
//       }
//     } catch (error) {
//       console.error("Error creating Service Type:", error);
//       alert("Unable to create Service Type" );
//     }
//   };
  const onSubmitHandler = async (values, formikBag) => {
        try {
            const { email, mobile,name } = values;
            const UserItemToUpdate = userItems.find((item) => item.id === uid);

            if (!UserItemToUpdate) {
              toast.error("Service Type not found", {
                position: "top-right",
              });
              return;
            }
            // Update the service type document
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                email, mobile,name
            });
            toast.success("User updated successfully!", {
              position: "top-right",
            });
            setLoading(false)
            navigate("/users")
          } catch (error) {
            console.error("Error updating Service Type:", error);
            toast.error("Unable to update Service Type", {
              position: "top-right",
            });
            setLoading(false)

          }
  };

  return (
    <>
      {loading ? ( // Display the loader when loading is true
        <CMPLoader />
      ) : (
        <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
          {(formikProps) => (
            <Form>
              <EditUsers formikProps={formikProps} uid={uid} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};


export default EditUserWrapper
