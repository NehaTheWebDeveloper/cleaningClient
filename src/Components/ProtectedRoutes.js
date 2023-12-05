import React from "react";

// import {  useUserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = (props) => {
  const { user } = useSelector((state) => state.auth);

  const {Components} =props
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
    <div className="h-full ">
    <Components />

    </div>
    </>
  );
};

export default ProtectedRoutes;