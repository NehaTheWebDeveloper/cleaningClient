import React from "react";
const ConfirmationModal = ({ isOpen, onCancel, onConfirm,text,task }) => {
  return (
    <div className={`fixed inset-0  flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="lg:w-1/3 xs:w-3/4 rounded-lg shadow-lg p-4 bg-white">
          <header className="bg-primary-main text-gray-900 p-4 rounded-t-lg">
            <p className="text-2xl font-semibold text-center">Confirmation</p>
          </header>
          <section className="p-4">
            <p className="text-gray-800 lg:text-xl text-center font-bold xs:text-sm ">
              { text}
            </p>
          </section>
          <footer className="flex justify-end p-4">
            <button
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md mr-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className={`${task ==="Delete" ?" px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md" : "px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"} ` }
              onClick={onConfirm}
            >
             { task}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
