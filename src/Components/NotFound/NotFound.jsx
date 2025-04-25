/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./NotFound.module.css";
import notFoundDark from "../../assets/notfounddark.png";
export default function NotFound() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex flex-wrap items-center justify-center">
        <p className="default-text-color text-3xl font-bold my-10">
          Not Found Note
        </p>
        <img className="p-10 w-full md:w-1/2 lg:w-1/3" src={notFoundDark} alt="" />
      </div>
    </>
  );
}
