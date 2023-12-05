import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  setProviderPage,
  setProviderSearchQuery,
} from "../../Redux/Slices/ProviderSlice";
import CMPUploadExcelForm from "../../Components/CMPUploadExcelForm/CMPUploadExcelForm";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Database/Firebase";
import CMPPagination from "../../Components/CMPPagination/CMPPagination";
import sampleDataUrl from "../../../src/sampleExcelData.xlsx"
import  { downloadSampleData } from "../../Components/Utils/downloadSampleData"
import CMPTable from "../../Components/CMPTable/CMPTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProviderListing = ({ columns, rows }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sheetData, setSheetData] = useState(null);

  const providersState = useSelector((state) => state.providers);
  const {
    providerPage,
    providerTotalItems,
    providerIsTableLoading,
    providerRowsPerPage,
    providerSearchQuery,
  } = providersState;
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);

  const handleExcelForm = () => {
    setIsUploadFormVisible(true);
  };
  const onHandleSheetData = async (e) => {
    setSheetData(e);
    try {
      if (sheetData && sheetData["Sheet1"]) {
        const sheet1Data = sheetData["Sheet1"];
  
        const providersCollection = collection(db, "providers");
        const addedProviders = [];
  
        for (let i = 1; i < sheet1Data.length; i++) {
          const providerData = sheet1Data[i];
          
          // Skip empty rows
          if (!providerData.length) {
            continue;
          }
  
          // Check if any of the data is undefined
          if (providerData.some((value) => value === undefined)) {
            console.error("Undefined value found in row", i, providerData);
            continue; // Skip this row
          }
  
          // Map providerData to match your Firebase database structure
          const provider = {
            firstName: providerData[0]  || "",
            lastName: providerData[1]  || "",
            phone: providerData[2]  || "",
            email: providerData[3]  || "",
            accountNumber: providerData[4] || "",
            ifscCode: providerData[5] || "",
            addressLine: providerData[6] || "",
            streetAddress: providerData[7] || "",
            city: providerData[8] || "",
            state: providerData[9] || "",
            country: providerData[10] || "",
            postalZip: providerData[11] || "",

          };
  
          const docRef = await addDoc(providersCollection, provider);
          addedProviders.push(docRef);
        }
        toast.success(`${addedProviders.length} Providers added successfully`, {
          position: "top-right",
        });
  
        setIsUploadFormVisible(false);
      }
    } catch (error) {
      console.error("Error adding Providers:", error);
      toast.error("Unable to add Providers.", {
        position: "top-right",
      });
    }
  };
  
  
  
  
  const handleDeleteCanceled = () => {
    setIsUploadFormVisible(false);
  };
  const handlePageChange = (newPage) => {
    dispatch(setProviderPage(newPage));
  };
  const rowCount = rows?.length;

  // Calculate the visibleData within your page component
  const startIndex = (providerPage - 1) * providerRowsPerPage;
  const endIndex = Math.min(startIndex + providerRowsPerPage, rowCount);
  const visibleData = rows.slice(startIndex, endIndex);
  const handleSearchOperation = (e) => {
    dispatch(setProviderSearchQuery(e.target.value));
  };
  const statusFilteredData = () => {
    let filteredRows = visibleData;

    if (providerSearchQuery) {
      filteredRows = filteredRows.filter((row) =>
        Object.values(row)
          .filter((value) => typeof value === "string")
          .some((value) =>
            value.toLowerCase().includes(providerSearchQuery.toLowerCase())
          )
      );
    }
    return filteredRows;
  };
console.log(providerIsTableLoading,"Provider")

  const handleDownloadSampleData = () => {
    const Url =sampleDataUrl 
    const file = "sampleExcelData.xlsx"
    downloadSampleData(Url,file)

  };
  const FormSectionHeading = ({ children }) => {
    return (
      <div className="border-l-4 border-primary-main px-3 py-2 text-slate-700 font-medium text-2xl ">
        {children}
      </div>
    );
  };
  const FilteredRows = statusFilteredData();
  return (
    <div className="flex flex-col gap-2 px-4 py-3 h-full">
      {/* Breadcrumbs */}
      <div className="flex justify-end items-center">
        <div className="grid lg:grid-cols-6 xs:grid-cols-12  justify-end gap-4">
          <div className="lg:col-span-2 xs:col-span-4 ">
            <button
              className="py-2 px-3 rounded bg-blue-500 text-white  w-full xs:text-[9px] lg:text-[12px]"
              onClick={() => handleExcelForm()}
            >
              Import
            </button>
          </div>
          <div className="lg:col-span-2 xs:col-span-4">
            <button
              className="py-2 px-3 rounded bg-blue-500 text-white w-full xs:text-[9px] lg:text-[12px]"
              onClick={() => handleDownloadSampleData()}
            >
              Download Sample 
            </button>
          </div>
          <div className="lg:col-span-2 xs:col-span-4">
            <button
              className="py-2 px-3 rounded bg-graybg text-white  w-full xs:text-[9px] lg:text-[12px]"
              onClick={() => navigate("/providers/add")}
            >
              Add Provider
            </button>
          </div>
        </div>
      </div>
      <FormSectionHeading>Providers</FormSectionHeading>
      <div className=" flex flex-col overflow-auto rounded bg-white gap-2">
        <div className=" flex items-center justify-end">
          <input
            className="w-full focus:outline-none md:w-auto px-2 py-1 bg-gray-200 text-gray-700 rounded-md border border-gray-300"
            placeholder="Search"
            value={providerSearchQuery}
            onChange={handleSearchOperation}
          />
        </div>
        {/* Table */}
        <div className="border flex flex-col grow overflow-auto rounded bg-white">
          <CMPTable
            columns={columns}
            rows={FilteredRows}
            isCheckbox={false}
            isLoading={providerIsTableLoading}
          />
        </div>
        <div className="flex justify-end">
          <CMPPagination
            totalItems={providerTotalItems}
            itemsPerPage={providerRowsPerPage}
            currentPage={providerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {/* Render the upload form when isUploadFormVisible is true */}
      {isUploadFormVisible && (
        <CMPUploadExcelForm
        onCancel={handleDeleteCanceled}
        isOpen={isUploadFormVisible}
        onUpload={onHandleSheetData}
        />
      )}
    </div>
  );
};

export default ProviderListing;
