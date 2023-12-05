import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import ProviderDetails from "./ProviderDetails";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProviderDetailsWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [providerDetails, setProviderDetails] = useState({});

  const { providerItems } = useSelector((state) => state.providers);
  const fetchProviderDetails = async () => {
    try {
      let singleProviderData = providerItems.find((item) => item.id === uid);
      if (!singleProviderData) {
        setLoading(true); 
      } else {
        setProviderDetails(singleProviderData);
        setLoading(false); // Data is loaded, set loading to false
      }
    } catch (error) {
      console.error("Error fetching booking by ID:", error);
      toast.error("Unable tofetch booking", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchProviderDetails();
  }, [uid]); // Fetch data when uid changes

  const initialValues = {
    firstName: providerDetails?.firstName || "",
    lastName: providerDetails?.lastName || "",
    phone: providerDetails?.phone || "",
    email: providerDetails?.email || "",
    accountNumber:providerDetails?.accountNumber || "",
    ifscCode:providerDetails?.ifscCode || "",

    addressLine: providerDetails?.addressLine || "",
    streetAddress: providerDetails?.streetAddress || "",
    city: providerDetails?.city || "",
    state: providerDetails?.state || "",
    country: providerDetails?.country || "",
    postalZip: providerDetails?.postalZip || "",
  };

  return (
    <>
      {loading ? ( // Display the loader when loading is true
        <CMPLoader />
      ) : (
        <Formik enableReinitialize initialValues={initialValues}>
          {(formikProps) => (
            <Form>
              <ProviderDetails formikProps={formikProps} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ProviderDetailsWrapper;
