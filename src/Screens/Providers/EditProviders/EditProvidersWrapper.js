import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useSelector } from "react-redux";
import EditProviders from "./EditProviders";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProvidersWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const { providerItems } = useSelector((state) => state.providers);

  const providerById = providerItems.find(
    (providerItem) => providerItem.id === uid
  );

  const navigate = useNavigate();

  const initialValues = {
    firstName: providerById?.firstName || "",
    lastName: providerById?.lastName || "",
    streetAddress: providerById?.streetAddress || "",
    addressLine: providerById?.addressLine || "",
    state: providerById?.state || "",
    postalZip: providerById?.postalZip || "",
    city: providerById?.city || "",
    country: providerById?.country || "",
    email: providerById?.email || "",
    phone: providerById?.phone || "",
  };

  const onSubmitHandler = async (values, formikBag) => {
    const {
      firstName,
      lastName,
      streetAddress,
      addressLine,
      state,
      postalZip,
      city,
      country,
      email,
      phone,
    } = values;
    try {
      const providerItemToUpdate = providerItems.find(
        (item) => item.id === uid
      );

      if (!providerItemToUpdate) {
        toast.error("Provider not found", {
          position: "top-right",
        });
        return;
      }
      // Update the service type document
      const providerRef = doc(db, "providers", uid);
      await updateDoc(providerRef, {
        firstName,
        lastName,
        streetAddress,
        addressLine,
        state,
        postalZip,
        city,
        country,
        email,
        phone,
      });

      toast.success("Service Type updated successfully!", {
        position: "top-right",
      });
      setLoading(false)
      navigate("/providers");
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
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          enableReinitialize
        >
          {(formikProps) => (
            <Form>
              <EditProviders formikProps={formikProps} uid={uid} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditProvidersWrapper;
