import React, { useState } from "react";
import ConfirmationModal from "../../Components/CMPConfirmationDialog/CMPConfirmationDialog";
import CMPBreadCrumbs from "../../Components/CMPBreadCrumps/CMPBreadCrumps";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";

const breadcrumbs = [
  {
    label: "Dashboard",
    path: "/",
    icon: <IoPersonCircleOutline />,
  },
  {
    label: "Bookings",
    path: "/bookings",
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
const Payment = () => {
  const navigate = useNavigate();

  const [isOpenPaymentConfirmation, setIsOpenPaymentConfirmation] =
    useState(false);
  const handlePaymentPopUp = () => {
    setIsOpenPaymentConfirmation(true);
  };
  const handleClosePaymentPopUp = () => {
    setIsOpenPaymentConfirmation(false);
  };
  const handlePayment = () => {
    setIsOpenPaymentConfirmation(false);
  };
  return (
    <div className="h-full py-5 px-4 flex flex-col gap-3">
        <div
          className="border px-4 py-1 cursor-pointer text-gray-800  font-bold w-[100px] rounded-md flex items-center justify-between gap-2"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack />
          Back
        </div>
        <CMPBreadCrumbs breadcrumbs={breadcrumbs} />
        {/* <FormSectionHeading>Booking Details</FormSectionHeading> */}
      <div className="grid grid-cols-12  w-full h-full overflow-hidden  gap-6">
        <div className=" col-span-6 bg-white    ">
          <div className=" rounded-lg shadow-lg h-[400px] bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800 pb-10 ">
              Service Information
            </h1>
            <div className="  rounded-md pb-8 flex items-center ">
              <label className="text-gray-600   px-2 font-medium ">
                Service Type:
              </label>
              <span className="text-gray-800  font-semibold">Deep Clean</span>
            </div>
            <div className="  rounded-md pb-8 flex items-center ">
              <label className="text-gray-600   px-2 font-medium ">
                Service Start Date:
              </label>
              <span className="text-gray-800 font-semibold">18/March/1992</span>
            </div>
            <div className="  rounded-md pb-8 flex items-center ">
              <label className="text-gray-600   px-2 font-medium ">
                Service End Date:
              </label>
              <span className="text-gray-800 font-semibold">18/May/1992</span>
            </div>
            <div className="  rounded-md pb-8 flex items-center ">
              <label className="text-gray-600  px-2 font-medium ">
                Addons:
              </label>
              <span className="text-gray-800 font-semibold">Cleaning Car</span>
            </div>
          </div>
        </div>
        <div className=" col-span-6 bg-white    h-full">
          <div className=" rounded-lg shadow-lg h-[400px] bg-gray-50 p-6">
            <h1 className="text-2xl pb-8 flex items-center justify-between font-bold text-gray-800">
              Billing Information
            </h1>
            <div className="  rounded-md pb-8 flex items-center justify-between">
              <label className="text-gray-600 font-medium">
                Payment Status:
              </label>
              <span className="text-gray-800 font-semibold">Complete</span>
            </div>
            <div className="  rounded-md pb-8 flex items-center justify-between">
              <label className="text-gray-600 font-medium">Payment :</label>
              <span className="text-gray-800 font-semibold">12000</span>
            </div>
            <div className="  rounded-md pb-8 flex items-center justify-between">
              <label className="text-gray-600 font-medium">
                Total Payment:
              </label>
              <span className="text-gray-800 font-semibold">15000</span>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none "
                onClick={handlePaymentPopUp}
              >
                <span>Release Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpenPaymentConfirmation && (
        <ConfirmationModal
          isOpen={isOpenPaymentConfirmation}
          onCancel={handleClosePaymentPopUp}
          onConfirm={handlePayment}
          text="Do you want to Release Payment ?"
          task="Confirm"
        />
      )}
    </div>
  );
};

export default Payment;
