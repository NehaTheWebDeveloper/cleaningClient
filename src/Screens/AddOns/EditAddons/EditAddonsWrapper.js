import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import { useSelector } from "react-redux";
import EditAddons from "./EditAddons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditAddonsWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(false);
  const { addOnsItems } = useSelector((state) => state.addOns);

  const addonById = addOnsItems.find((addOnsItem) => addOnsItem.id === uid);

  const navigate = useNavigate();

  const initialValues = {
    addons: addonById?.addons || "",
    price: addonById?.price || "",
    perVisit: addonById?.perVisit || "",
    serviceType: addonById?.serviceType || "",
  };

  const onSubmitHandler = async (values, formikBag) => {
    setLoading(true);
    try {
      const { serviceType, addons, perVisit, price } = values;
      const addOnsItemsToUpdate = addOnsItems.find((item) => item.id === uid);

      if (!addOnsItemsToUpdate) {
        toast.error("AddOns Type not found", {
          position: "top-right",
        });
        return;
      }
      // Update the service type document
      const addOnsRef = doc(db, "addons", uid);
      await updateDoc(addOnsRef, {
        serviceType,
        addons,
        perVisit,
        price,
      });
      setLoading(false);

      toast.success("Add On updated successfully!", {
        position: "top-right",
      });
      navigate("/addons");
    } catch (error) {
      console.error("Error updating Addons:", error);
      toast.error("Unable to update Addons", {
        position: "top-right",
      });
      setLoading(false);
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
              <EditAddons formikProps={formikProps} uid={uid} />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditAddonsWrapper;
