import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useSelector } from "react-redux";
import AddAddons from "./AddAddons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAddonsWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const { addOnsItems } = useSelector((state) => state.addOns);


  const navigate = useNavigate();

  const initialValues = {
    addons: "",
    price: "",
    perVisit: "",
    serviceType:"",
    // Initialize other fields here
  };

  const onSubmitHandler = async (values, formikBag) => {
    try {
      const addonsData = values;
      const addonsDataCollection = collection(db, "addons");

      // Check if a service with the same name already exists
      const existingAddons = addOnsItems.find((addon)=>{
        return (
            addon.addons ===addonsData.addons
        )
      })

      // if (existingAddons) {
      //   toast.error("Addons with the same name already exists", {
      //     position: "top-right",
      //   });
      // } else {
      //   // Otherwise, add the service
      await addDoc(addonsDataCollection, addonsData);
        setLoading(false);
        toast.success("Service Type added successfully!", {
          position: "top-right",
        });
        navigate("/addons");
      // }
    } catch (error) {
      console.error("Error creating Service Type:", error);
      toast.error("Unable to create Service Type", {
        position: "top-right",
      });
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
              <AddAddons formikProps={formikProps} uid={uid} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};



export default AddAddonsWrapper