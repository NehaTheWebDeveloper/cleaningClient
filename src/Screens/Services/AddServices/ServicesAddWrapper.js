import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import ServicesAdd from "./ServicesAdd";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServicesAddWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const { serviceItems } = useSelector((state) => state.services);

  const navigate = useNavigate();

  const initialValues = {
    serviceType: "",
    price: "",
    time: "",
    description: "",
    // Initialize other fields here
  };

  const onSubmitHandler = async (values, formikBag) => {
    try {
      const serviceTypeData = values;
      const serviceTypeCollection = collection(db, "serviceType");

      // Check if a service with the same name already exists
      const existingService = serviceItems.find((serviceName)=>{
        return (
          serviceName.serviceType ===serviceTypeData.serviceType
        )
      })

      if (existingService) {
        toast.error("Service with the same name already exists", {
          position: "top-right",
        });
      } else {
        // Otherwise, add the service
        await addDoc(serviceTypeCollection, serviceTypeData);
        setLoading(false);
        toast.success("Service Type added successfully!", {
          position: "top-right",
        });
    
        navigate("/services");
      }
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
              <ServicesAdd formikProps={formikProps} uid={uid} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ServicesAddWrapper;
