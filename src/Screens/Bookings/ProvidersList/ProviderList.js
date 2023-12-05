import React from "react";

import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CMPTable from "../../../Components/CMPTable/CMPTable";



const ProviderList = ({rows,columns}) => {
  const navigate =useNavigate()
  return (
    <>
      <div className="flex flex-col gap-2 px-4 py-3 h-full">
      <div
          className="border px-4 py-1 cursor-pointer text-gray-800  font-bold w-[100px] rounded-md flex items-center justify-between gap-2"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack />
          Back
        </div>
        {/* Breadcrumbs */}

        <div className=" flex flex-col overflow-auto rounded bg-white gap-5 py-5">
          <div className="grid grid-cols-12"></div>

          {/* Table */}
          <div className="border flex flex-col grow overflow-auto rounded bg-white">
            <CMPTable
              columns={columns}
              rows={rows}
              isCheckbox={false}
            //   isLoading={isTableLoading}
            />
          </div>
 
        </div>
      </div>
    </>
  );
};

export default ProviderList;
