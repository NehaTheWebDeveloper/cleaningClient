import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useSelector } from "react-redux";
import EditServices from "./EditServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditServiceWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const { serviceItems } = useSelector((state) => state.services);
  const navigate = useNavigate();

 // Find the service type data by matching the 'uid'
 const serviceItem = serviceItems.find((item) => item.id === uid);


 // Initialize 'initialValues' with the found service type data
 const initialValues = {
   serviceType: serviceItem?.serviceType || "",
   time: serviceItem?.time || "",
   price: serviceItem?.price || "",
   description: serviceItem?.description || "",
 };


  const onSubmitHandler = async (values, formikBag) => {
    try {
      const { serviceType, time, description, price } = values;
      const serviceTypeRef = doc(db, "serviceType", uid);
      await updateDoc(serviceTypeRef, {
        serviceType,
        time,
        description,
        price,
      });
      toast.success("Service Type updated successfully!", {
        position: "top-right",
      });
      setLoading(false)
      navigate("/services");
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
      {loading ? (
        <CMPLoader />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          enableReinitialize
        >
          {(formikProps) => (
            <Form>
              <EditServices formikProps={formikProps} uid={uid} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditServiceWrapper;

