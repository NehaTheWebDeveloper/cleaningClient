import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import ProviderAdd from "./ProviderAdd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProviderAddWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    streetAddress: "",
    addressLine: "",
    state: "",
    postalZip: "",
    city: "",
    country: "",
    email: "",
    phone: "",

    // Initialize other fields here
  };

  const onSubmitHandler = async (values, formikBag) => {
    try {
      const providersData = values;
      const providersCollection = collection(db, "providers");

      await addDoc(providersCollection, providersData);
      setLoading(false);
      toast.success("Provider added successfully!", {
        position: "top-right",
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/providers");
    } catch (error) {
      console.error("Error creating Provider:", error);
      toast.error("Error creating Provider", {
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
              <ProviderAdd formikProps={formikProps} uid={uid} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProviderAddWrapper;
