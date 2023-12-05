import React from "react";
import CMPTextField from "../../../Components/CMPTextField/CMPTextField";

import { useNavigate } from "react-router-dom";
import { Field } from "formik";
import { BiArrowBack } from "react-icons/bi";


const countryOptions = [
    "Bharat",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    // Add more countries to the list as needed
  ];
  
  const FormSectionHeading = ({ children }) => {
    return (
      <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
        {children}
      </div>
    );
  };
const ProviderAdd = ({ formikProps, onSubmitHandler }) => {
  const navigate = useNavigate();
  const { values, setFieldValue, isSubmitting } = formikProps;

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
        <FormSectionHeading>Add Provider</FormSectionHeading>

        <div className="px-3 py-5 grid lg:grid-cols-12 gap-5">
          <div className="col-span-3">
            <CMPTextField
              name="firstName"
              label="First Name"
              placeholder="First Name"
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
              onChange={(e) => {
                setFieldValue("email", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="streetAddress"
              label="Street Address"
              placeholder="StreetAddress"
              value={values.streetAddress}
              onChange={(e) => {
                setFieldValue("streetAddress", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="addressLine"
              placeholder="Address Line"
              label="Address Line"
              value={values.addressLine}
              onChange={(e) => {
                setFieldValue("addressLine", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="state"
              label="Current State of the Home"
              placeholder="Current State of the Home"
              value={values.state}
              onChange={(e) => {
                setFieldValue("state", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <CMPTextField
              name="postalZip"
              label="Postal Zip"
              placeholder="Postal Zip"
              value={values.postalZip}
              onChange={(e) => {
                setFieldValue("postalZip", e.target.value);
              }}
            />
          </div>

          <div className="col-span-3">
            <CMPTextField
              name="city"
              label="City"
              placeholder="City"
              value={values.city}
              onChange={(e) => {
                setFieldValue("city", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <Field
              as="select"
              id="country"
              name="country"
              className="mt-1 p-2 block w-full border focus:outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a country</option>
              {countryOptions.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </Field>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <button
              className="border bg-blue-600 px-3 py-2 rounded text-white"
              isLoading={isSubmitting}
              onSubmit={onSubmitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderAdd;
