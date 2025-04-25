/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./Footer.module.css";
export default function Footer() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="p-7 flex items-center justify-center default-background">
        <p className="default-text-color font-bold text-2xl">Notes App Footer</p>
      </div>
    </>
  );
}
