import React from "react";
import { Breadcrumbs ,Link} from "@mui/material";



const CMPBreadCrumbs = ({ breadcrumbs }) => {
  return (
    <>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        
        {breadcrumbs.map((breadcrumb,index)=>{
          return (
            <Link
            key={index}
            underline="hover"
            color="inherit"
            href={breadcrumb.path}
            className = {`${breadcrumb.path && "cursor-pointer text-lg font-medium"}`}
          >
            <span className={`text-lg font-medium flex gap-2 items-center ${ breadcrumb.path ? "" : "text-gray-800"}`}>{breadcrumb.label}</span>
          </Link>
          )
        })}
      </Breadcrumbs>
    </>
  );
};

export default CMPBreadCrumbs;
