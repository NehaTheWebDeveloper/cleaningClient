import React  from "react";

import CMPTextField from "../../../Components/CMPTextField/CMPTextField";
import { Field } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";


const FormSectionHeading = ({ children }) => {
  return (
    <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
      {children}
    </div>
  );
};

const EditAddons = ({ formikProps, onSubmitHandler }) => {
  const { values, setFieldValue, isSubmitting } = formikProps;
  const { serviceItems } = useSelector((state) => state.services);
  const navigate = useNavigate()

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
        <FormSectionHeading>Edit Addons</FormSectionHeading>

        <div className="px-3 py-5 grid lg:grid-cols-12 gap-5">
    
          <div className="col-span-6">
            <CMPTextField
              name="addons"
              label="Addons"
              placeholder="Addons"
              value={values.addons}
              onChange={(e) => {
                setFieldValue("addons", e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <CMPTextField
              name="price"
              label="Price"
              placeholder="Price"
              value={values.price}
              onChange={(e) => {
                setFieldValue("price", e.target.value);
              }}
            />
          </div>
        
   
          <div className="col-span-6">
            <CMPTextField
              name="perVisit"
              label="PerVisit"
              placeholder="PerVisit"
              value={values.perVisit}
              onChange={(e) => {
                setFieldValue("perVisit", e.target.value);
              }}
            />
          </div>
          <div className="col-span-3">
            <label
              htmlFor="serviceType"
              className="block text-sm font-medium text-gray-700"
            >
              ServiceType
            </label>
            <Field
              as="select"
              id="serviceType"
              name="serviceType"
              className="mt-1 p-2 block w-full border focus:outline-none border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a serviceType</option>
              {serviceItems.map((serviceType, index) => (
                <option key={index} value={serviceType.serviceType}>
                 {serviceType.serviceType}
                </option>
              ))}
            </Field>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <button
              className="border bg-graybg px-3 py-2 rounded text-white"
              isLoading={isSubmitting}
              onSubmit={onSubmitHandler}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default EditAddons