/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./ProtectedRouter.module.css";
import Login from "./../../Pages/Login/Login";
import { Navigate } from "react-router-dom";
export default function ProtectedRouter(props) {
  if (localStorage.getItem("NoteAppToken")) {
    return props.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
