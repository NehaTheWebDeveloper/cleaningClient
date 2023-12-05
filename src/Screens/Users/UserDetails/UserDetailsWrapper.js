import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import { useSelector } from "react-redux";
import UserDetails from "./UsersDetails";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetailsWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  const { userItems } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let singleUserData = userItems.find((item) => item.id === uid);
        if (!singleUserData) {
          setLoading(true);
        } else {
          setUserDetails(singleUserData);
   
          setLoading(false); // Data is loaded, set loading to false
        }
      } catch (error) {
        console.error("Error fetching USer by ID:", error);
        toast.error("No User Found of this Id", {
          position: "top-right",
        });
      }
    };
    
    fetchUserDetails(); // Call the function inside the useEffect
  
  }, [uid, userItems]);
  

  const initialValues = {
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    mobile: userDetails?.mobile || "",

  };

  return (
    <>
      {loading ? ( // Display the loader when loading is true
        <CMPLoader />
      ) : (
        <Formik enableReinitialize initialValues={initialValues}>
          {(formikProps) => (
            <Form>
              <UserDetails
                formikProps={formikProps}
                userItems={userItems}
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};


export default UserDetailsWrapper