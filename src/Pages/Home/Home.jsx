/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import NoteCard from "../../Components/NoteCard/NoteCard";
import useGetNote from "../../Hooks/GetNoteHook";
import useRegisterHook from "../../Hooks/RegisterHook";
import { TokenContext } from "./../../Context/TokenContext";
import NoteModal from "../../Components/NoteModal/NoteModal";

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
      <div className="my-10">
        <div className="text-center flex justify-center my-5">
          <h1 className="capitalize inline-block me-3 text-4xl font-semibold">
            Mai's Notes
          </h1>
          <NoteModal />
        </div>
        <div className="container mx-auto">
          <div className="row p-2 mx-7">
            {notesList?.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
