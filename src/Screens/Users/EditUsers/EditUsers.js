import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import CMPBreadCrumbs from "../../../Components/CMPBreadCrumps/CMPBreadCrumps";
import CMPTextField from "../../../Components/CMPTextField/CMPTextField";

const breadcrumbs = [
  {
    label: "Dashboard",
    path: "/",
    icon: <IoPersonCircleOutline />,
  },
  {
    label: "Users",
    path: "/users",
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

const EditUsers = ({ formikProps, onSubmitHandler }) => {
  const { values, setFieldValue, isSubmitting } = formikProps;
  return ( 
    <>
      <div className="h-full py-5 px-4 flex flex-col gap-3">
        <CMPBreadCrumbs breadcrumbs={breadcrumbs} />
        <FormSectionHeading>Edit User</FormSectionHeading>

        <div className="px-3 py-5 grid grid-cols-12 gap-5">
    
          <div className="col-span-6">
            <CMPTextField
              name="name"
              label="Name"
              placeholder="Name"
              value={values.name}
              onChange={(e) => {
                setFieldValue("name", e.target.value);
              }}
            />
          </div>
          <div className="col-span-6">
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
        
   
          <div className="col-span-6">
            <CMPTextField
              name="mobile"
              label="Mobile"
              placeholder="Mobile"
              value={values.mobile}
              onChange={(e) => {
                setFieldValue("mobile", e.target.value);
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
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};



export default EditUsers