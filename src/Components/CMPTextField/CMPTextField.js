import { ErrorMessage } from "formik";
import React from "react";
import { getInputHeight } from "../Utils/formUtils/getInputHeight";

const CMPTextField = ({
  name,
  value,
  className = "bg-white rounded",
  onChange,
  label,
  required,
  size = "small",
  placeholder,
  ...rest
}) => {
  return (
    <div className="relative">
      {label && (
        <label className=" font-medium text-primary-main text-sm">
          {" "}
          {label} {required && <span className="text-red-500"> * </span>}{" "}
        </label>
      )}
      <input 
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        className={`${getInputHeight(
          size
        )} w-full px-2 text-slate-700 border border-slate-400 outline-primary-main  ${
          label && "mt-1"
        }  
        ${className}`}
        {...rest}
      />
      {name && (
        <ErrorMessage name={name}>
          {(errMsg) => (
            <p className="font-poppins absolute text-[12px] text-start mt-0 text-red-500">
              {" "}
              {errMsg}{" "}
            </p>
          )}
        </ErrorMessage>
      )}
    </div>
  );
};

export default CMPTextField;
