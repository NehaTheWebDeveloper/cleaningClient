import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
// import { useUserAuth } from "../context/AuthContext";
import { loginUser } from "../Redux/Slices/AuthSlice";
import { auth } from "../Database/Firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  // const { logOut, user } = useUserAuth();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);
  const handleOpenInfo = () => {
    setUserInfo(!userInfo);
  };
  const handleLogout = async () => {
    try {
      // await logOut();
      dispatch(loginUser());
      signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
    navigate("/login");
  };

  return (
    <div className="grid grid-cols-12  border-blue-100 border-b p-2 sticky top-0">
      <div className="col-span-10"></div>
      <div className="col-span-2 flex justify-end gap-2">
        <div> {/* Your user icon or avatar here */}</div>
        <div
          className={`bg-graybg rounded-full p-3 border z-100 text-white w-12 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition duration-300 shadow-md ${
            userInfo ? "bg-graybg text-white" : ""
          }`}
          onClick={handleOpenInfo}
        >
          {userInfo ? "User" : "User"}
        </div>
      </div>
      {userInfo && (
        <div className="absolute top-14 right-10 w-48 bg-graybg rounded-md p-3 flex items-start gap-2 flex-col border border-gray-400 shadow-md">
          <div className="border-b pb-2">
            <h1 className="text-white font-bold text-sm">ADMIN</h1>
            <p className="text-white text-xs">{user?.email}</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleLogout()}
              className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
