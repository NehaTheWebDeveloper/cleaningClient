import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import CMPBreadCrumbs from "../../../Components/CMPBreadCrumps/CMPBreadCrumps";
import CMPTextField from "../../../Components/CMPTextField/CMPTextField";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const breadcrumbs = [
  {
    label: "Dashboard",
    path: "/",
    icon: <IoPersonCircleOutline />,
  },
  {
    label: "Services",
    path: "/services",
    icon: <IoPersonCircleOutline />,
  },
];

const FormSectionHeading = ({ children }) => {
  return (
    <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
      {children}
    </div>
  );
};

const EditServices = ({ formikProps, onSubmitHandler }) => {
  const navigate = useNavigate()
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
        <CMPBreadCrumbs breadcrumbs={breadcrumbs} />
        <FormSectionHeading>Edit Service </FormSectionHeading>

        <div className="px-3 py-5 grid lg:grid-cols-12 gap-5">
    
          <div className="col-span-6">
            <CMPTextField
              name="serviceType"
              label="ServiceType"
              placeholder="ServiceType"
              value={values.serviceType}
              onChange={(e) => {
                setFieldValue("serviceType", e.target.value);
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
            <textarea
              name="description"
              rows="4" // Adjust the number of rows as needed
              className="w-full border rounded-md p-2"
              placeholder="Description"
              value={values.description}
              onChange={(e) => {
                setFieldValue("description", e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
            <CMPTextField
              name="time"
              label="Time"
              placeholder="Time"
              value={values.time}
              onChange={(e) => {
                setFieldValue("time", e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <button
              className="border bg-graybg px-3 py-2 rounded text-white"
              isLoading={isSubmitting}
              onSubmit={onSubmitHandler}
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default EditServices