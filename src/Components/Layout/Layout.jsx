/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import NavBar from "./../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Home from "../../Pages/Home/Home";
import { Outlet } from "react-router-dom";
export default function Layout() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
    <div className="bg-gray-100 dark:bg-gray-700 default-text-color ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
    </>
  );
}
