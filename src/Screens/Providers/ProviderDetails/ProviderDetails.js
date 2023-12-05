import React from "react";
import CMPTextField from "../../../Components/CMPTextField/CMPTextField";
import { BiArrowBack } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

const FormSectionHeading = ({ children }) => {
  return (
    <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
      {children}
    </div>
  );
};
const ProviderDetails = ({ formikProps }) => {
  const { values, setFieldValue } = formikProps;
  const navigate = useNavigate();
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

        <FormSectionHeading>Provider Details</FormSectionHeading>

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
              value={values.lastName}
              disabled={true}
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
              value={values.phone}
              disabled={true}
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
              value={values.email}
              disabled={true}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="accountNumber"
              disabled={true}
              label="Account Number"
              placeholder="Account Number"
              value={values.accountNumber}
              onChange={(e) => {
                setFieldValue("accountNumber", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="ifscCode"
              label="IFSC Code"
              disabled={true}
              placeholder="IFSC Code"
              value={values.ifscCode}
              onChange={(e) => {
                setFieldValue("ifscCode", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="addressLine"
              label="Address Line"
              placeholder="Address Line"
              disabled={true}
              value={values.addressLine}
              onChange={(e) => {
                setFieldValue("addressLine", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="streetAddress"
              label="Street Address"
              disabled={true}
              placeholder="Street Address"
              value={values.streetAddress}
              onChange={(e) => {
                setFieldValue("streetAddress", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="city"
              label="City"
              placeholder="City"
              disabled={true}
              value={values.city}
              onChange={(e) => {
                setFieldValue("city", e.target.value);
              }}
            />
          </div>

          <div className="col-span-3">
            <CMPTextField
              name="state"
              label="State"
              disabled={true}
              placeholder="State"
              value={values.state}
              onChange={(e) => {
                setFieldValue("state", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="country "
              label="Country "
              disabled={true}
              placeholder="Country "
              value={values.country}
              onChange={(e) => {
                setFieldValue("country ", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="postalZip"
              label="PostalZip"
              disabled={true}
              placeholder="PostalZip"
              value={values.postalZip}
              onChange={(e) => {
                setFieldValue("postalZip", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderDetails;
