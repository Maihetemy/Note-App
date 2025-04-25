/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import NoteCard from "../../Components/NoteCard/NoteCard";

export default function Home() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="container mx-auto ">
        <div className="row px-5">
          <NoteCard />
        </div>
      </div>
    </>
  );
}
