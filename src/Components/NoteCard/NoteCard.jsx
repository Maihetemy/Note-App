/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./NoteCard.module.css";
import { FaTrash } from "react-icons/fa";
import { RiStickyNoteFill } from "react-icons/ri";

export default function NoteCard() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="w-1/2 md:w-1/3 lg:w-1/4 p-3 default-background my-1 rounded-2xl">
        <h2 className="text-2xl font-semibold my-3">Note Title</h2>
        <div className="flex justify-around w-full my-3 text-xl">
          <FaTrash className="text-red-700" />
          <RiStickyNoteFill className="text-green-700" />
        </div>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
        <p>Note Content</p>
      </div>
    </>
  );
}
