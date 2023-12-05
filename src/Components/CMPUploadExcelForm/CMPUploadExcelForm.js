import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  

const CMPUploadExcelForm = ({ isOpen, onCancel, onUpload }) => {
  const fileRef = useRef();
  const [sheetData, setSheetData] = useState(null);

  const checkFileExtension = (name) => {
    const extension = name.split(".").pop().toLowerCase();
    const fileExtensions = ["xlsx", "xls"];
    return fileExtensions.includes(extension);
  };

  const handleReadDataFromXl = async (data) => {
    try {
      const wb = XLSX.read(data, { type: "array" });
      const sheetData = {}; // Store sheet data here

      wb.SheetNames.forEach((sheetName) => {
        const ws = wb.Sheets[sheetName];
        const sheetDataArray = XLSX.utils.sheet_to_json(ws, { header: 1 }); // Convert sheet to array of arrays
        sheetData[sheetName] = sheetDataArray;
      });

      // Set sheetData in the component's state
      setSheetData(sheetData);

    } catch (error) {
      console.error("Error reading Excel file:", error);
      toast.error("Error reading Excel file. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleFile = async (e) => {
    const myfile = e.target.files[0];
    if (!myfile) return;

    if (!checkFileExtension(myfile.name)) {
      toast.error("Invalid File Extension.", {
        position: "top-right",
      });
      return;
    }

    try {
      const data = await myfile.arrayBuffer();
      handleReadDataFromXl(data);
    } catch (error) {
      console.error("Error reading Excel file:", error);
      toast.error("Error reading Excel file. Please try again.", {
        position: "top-right",
      });
    }
  };

  // const handleRemoveFile = () => {
  //   // Clear the sheet data and input value
  //   setSheetData(null);
  //   fileRef.current.value = "";
  // };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-4">
          <header className="bg-primary-main text-gray-900 p-4 rounded-t-lg">
            <p className="text-lg text-center  font-bold">UPLOAD FILE</p>
          </header>
          <section className="p-4">
            <div className="flex items-center justify-between border">
              <div className="py-3">
                <label></label>
                <input
                  type="file"
                  accept="xlsx,xls"
                  multiple={false}
                  onChange={(e) => handleFile(e)}
                  ref={fileRef}
                />
              </div>
              {/* <div
                className="rounded px-5 flex justify-center bg-red-500 cursor-pointer"
                onClick={handleReadDataFromXl}
              >
               -
              </div> */}
            </div>
          </section>
          <footer className="flex justify-end p-4">
            <button
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md mr-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-green-600 hover:bg-red-700 text-white rounded-md"
              onClick={() => onUpload(sheetData)}
            >
              Upload
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CMPUploadExcelForm;

