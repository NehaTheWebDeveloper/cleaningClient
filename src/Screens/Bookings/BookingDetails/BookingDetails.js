import React, { useState } from "react";
import CMPTextField from "../../../Components/CMPTextField/CMPTextField";

import { useNavigate } from "react-router-dom";
import { Field } from "formik";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../Database/Firebase";
import ConfirmationModal from "../../../Components/CMPConfirmationDialog/CMPConfirmationDialog";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormSectionHeading = ({ children }) => {
  return (
    <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
      {children}
    </div>
  );
};

const statusOptions = [
  // { value: "", label: "Select Status" },
  { value: "Pending", label: "Pending" },
  { value: "Processing", label: "Processing" },
  { value: "Complete", label: "Complete" },
];
const BookingDetails = ({ formikProps, uid, isStatusComplete }) => {
  // const {uid} = useParams()
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { values, setFieldValue } = formikProps;
  const [newStatus, setNewStatus] = useState("");

  const handleUpdateBooking = async () => {
    navigate(`/bookings/${uid}/providerslist`);
  };
  const text = `Are You sure you want to Change the Status to ${newStatus}?`;
  const handleStatusChangeCanceled = () => {
    // Handle the case when the user cancels the status change
    setShowConfirmation(false); // Close the confirmation dialog
  };
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setNewStatus(newStatus); // Set the newStatus state
    setShowConfirmation(true);
  };

  const handleStatusChangeConfirmed = async () => {
    try {
      const bookingDocRef = doc(db, "bookings", uid);
      const bookingSnapshot = await getDoc(bookingDocRef);

      if (!bookingSnapshot.exists()) {
        toast.error("Booking not found", {
          position: "top-right",
        });
        setShowConfirmation(false); // Close the confirmation dialog
        return;
      }

      // Update the status field in Firestore with the newStatus
      await updateDoc(bookingDocRef, {
        status: newStatus,
      });
      setFieldValue("status", newStatus);
      // Status updated successfully
      toast.success("Status updated successfully!", {
        position: "top-right",
      });
      setShowConfirmation(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error updating status:", error);
      setFieldValue("status", values.status); // Reset to the previous status
      setShowConfirmation(false); // Close the confirmation dialog
    }
  };

  return (
    <>
      <div className="h-full py-5 px-4 flex flex-col gap-3">
        <div
          className="border px-4 py-1 cursor-pointer text-gray-800  font-bold w-[100px] rounded-md flex items-center justify-between gap-2"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack />
          Back
        </div>

        <FormSectionHeading>Booking Details</FormSectionHeading>
        {/* <div className="lg:flex lg:justify-between lg:items-center lg:gap-5"> */}
          <div className="grid lg:grid-cols-12 xs:grid-cols-12  items-center gap-5 ">
            <div className="lg:col-span-3 xs:col-span-8">
              <button className="w-full lg:text-lg xs:text-sm xs:px-1 font-medium bg-gray-700 text-white rounded lg:px-2 py-1">
                Service Type : {values.initialServicesRequested}
              </button>
            </div>
            <div className="lg:col-span-5 xs:col-span-6  justify-between items-center  ">
              <div className="lg:flex lg:gap-3 lg:items-center justify-between xs:grid  xs:grid-cols-12 xs:gap-5">
                <div className="bg-purple-900-500 xs:col-span-12">
                  {isStatusComplete === "Complete" ? (
                    <button
                      className="py-2 px-3 bg-blue-500 text-white rounded"
                      onClick={() => navigate("/payment")}
                    >
                      Payment
                    </button>
                  ) : null}
                </div>
                <div className="lg:flex lg:items-center lg:justify-between lg:gap-2 xs:col-span-12">
                  <label
                    htmlFor="status"
                    className="block text-xl font-medium text-gray-700"
                  >
                    Status:
                  </label>
                  <Field
                    as="select"
                    id="status"
                    name="status"
                    className="mt-1 p-2 block w-full border focus:outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={values.status} // Set the selected value
                    onChange={handleStatusChange} // Handle status change
                  >
                    {statusOptions.map((status, index) => (
                      <option key={index} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                    ;
                  </Field>
                </div>
                <div className=" lg:items-center lg:justify-between gap-2 xs:col-span-12 ">
                  <button
                    className="py-2 px-3 bg-blue-500 text-white rounded w-full"
                    onClick={handleUpdateBooking} // Call the fetchProvidersAndNavigate function when the button is clicked
                  >
                    Providers List
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
        <div className="px-3 py-5 grid lg:grid-cols-12 gap-5">
          <div className="col-span-3">
            <CMPTextField
              name="firstName"
              label="First Name"
              placeholder="First Name"
              disabled={true}
              value={values.firstName}
              onChange={(e) => {
                setFieldValue("firstName", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              disabled={true}
              value={values.lastName}
              onChange={(e) => {
                setFieldValue("lastName", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="phone"
              label="Phone"
              placeholder="Phone"
              disabled={true}
              value={values.phone}
              onChange={(e) => {
                setFieldValue("phone", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="email"
              label="Email"
              placeholder="Email"
              disabled={true}
              value={values.email}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="address"
              label="Address"
              placeholder="Address"
              disabled={true}
              value={values.address}
              onChange={(e) => {
                setFieldValue("address", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="homeType"
              label="Home Type"
              disabled={true}
              placeholder="Home Type"
              value={values.homeType}
              onChange={(e) => {
                setFieldValue("homeType", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="bedrooms"
              label="# of Bedrooms"
              disabled={true}
              placeholder="# of Bedrooms"
              value={values.bedrooms}
              onChange={(e) => {
                setFieldValue("bedrooms", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="bathrooms"
              label="# of Bathrooms"
              disabled={true}
              placeholder="# of Bathrooms"
              value={values.bathrooms}
              onChange={(e) => {
                setFieldValue("bathrooms", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="noOfBedrooms"
              label="Additional Bedrooms"
              disabled={true}
              placeholder="Additional Bedrooms"
              value={values.noOfBedrooms}
              onChange={(e) => {
                setFieldValue("noOfBedrooms", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="noOfBathrooms"
              label="Additional Bathrooms"
              disabled={true}
              placeholder="Additional Bathrooms"
              value={values.noOfBathrooms}
              onChange={(e) => {
                setFieldValue("noOfBathrooms", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="additionalFeatures"
              label="Additional Features"
              disabled={true}
              placeholder="Additional Features"
              value={values.additionalFeatures}
              onChange={(e) => {
                setFieldValue("additionalFeatures", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="houseMembers"
              label="House Members"
              disabled={true}
              placeholder="House Members"
              value={values.houseMembers}
              onChange={(e) => {
                setFieldValue("houseMembers", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="pets"
              label="Pet(s)"
              disabled={true}
              placeholder="Pet(s)"
              value={values.pets}
              onChange={(e) => {
                setFieldValue("pets", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="smoking"
              label="Smoking? Y/N"
              disabled={true}
              placeholder="Smoking? Y/N"
              value={values.smoking}
              onChange={(e) => {
                setFieldValue("smoking", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="pestType"
              label="Pests? What type?"
              disabled={true}
              placeholder="Pests? What type?"
              value={values.pestType}
              onChange={(e) => {
                setFieldValue("pestType", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="state"
              label="Current State of the Home"
              placeholder="Current State of the Home"
              disabled={true}
              value={values.state}
              onChange={(e) => {
                setFieldValue("state", e.target.value);
              }}
            />
          </div>

          <div className="col-span-3">
            <CMPTextField
              name="addOns"
              label="Add-ons"
              placeholder="Add-ons"
              disabled={true}
              value={values.addOns}
              onChange={(e) => {
                setFieldValue("addOns", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="areaOfFocus"
              label="Area(s) of Focus"
              placeholder="Area(s) of Focus"
              disabled={true}
              value={values.areaOfFocus}
              onChange={(e) => {
                setFieldValue("areaOfFocus", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="storage"
              label="Storage"
              placeholder="Storage"
              disabled={true}
              value={values.storage}
              onChange={(e) => {
                setFieldValue("storage", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="storageType"
              label="Storage Type(s)"
              placeholder="Storage Type(s)"
              value={values.storageType}
              disabled={true}
              onChange={(e) => {
                setFieldValue("storageType", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="cleaningSupplies"
              label="Cleaning Supplies"
              disabled={true}
              placeholder="Cleaning Supplies"
              value={values.cleaningSupplies}
              onChange={(e) => {
                setFieldValue("cleaningSupplies", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="cleaningEquipment"
              disabled={true}
              label="Cleaning Equipment"
              placeholder="Cleaning Equipment"
              value={values.cleaningEquipment}
              onChange={(e) => {
                setFieldValue("cleaningEquipment", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="anticipatedStartDate"
              disabled={true}
              label="Anticipated Start Date"
              placeholder="Anticipated Start Date"
              value={values.anticipatedStartDate}
              onChange={(e) => {
                setFieldValue("anticipatedStartDate", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="initialFrequencyofService"
              disabled={true}
              label="Initial Frequency of Service"
              placeholder="Initial Frequency of Service"
              value={values.initialFrequencyofService}
              onChange={(e) => {
                setFieldValue("initialFrequencyofService", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="mentalEmotionalState"
              label="Mental/Emotional State"
              disabled={true}
              placeholder="Mental/Emotional State"
              value={values.mentalEmotionalState}
              onChange={(e) => {
                setFieldValue("mentalEmotionalState", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="inCrisis"
              disabled={true}
              label="In Crisis 0-10"
              placeholder="In Crisis 0-10"
              value={values.inCrisis}
              onChange={(e) => {
                setFieldValue("inCrisis", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-span-12">
          <CMPTextField
            name="additionalNotes"
            disabled={true}
            label="Additional Notes"
            placeholder="Additional Notes"
            value={values.additionalNotes}
            onChange={(e) => {
              setFieldValue("additionalNotes", e.target.value);
            }}
          />
        </div>
        {showConfirmation && (
          <ConfirmationModal
            isOpen={showConfirmation}
            text={text}
            onCancel={handleStatusChangeCanceled}
            onConfirm={handleStatusChangeConfirmed}
            task="Confirm"
          />
        )}
      </div>
    </>
  );
};

export default BookingDetails;
