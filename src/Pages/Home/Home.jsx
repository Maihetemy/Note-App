/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import NoteCard from "../../Components/NoteCard/NoteCard";
import useGetNote from "../../Hooks/GetNoteHook";
import useRegisterHook from "../../Hooks/RegisterHook";
import { TokenContext } from "./../../Context/TokenContext";

export default function Home() {
  const [notesList, setNotesList] = useState();
  const { token } = useContext(TokenContext);
  const { data, error } = useGetNote(token);

  useEffect(() => {
    if (data) {
      console.log(data?.notes);
      setNotesList(data?.notes);
    }
  }, [token, data]);
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold mt-7">Mai's Notes</h1>
        <div className="row p-2 m-7">
          {notesList?.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      </div>
    </>
  );
}
