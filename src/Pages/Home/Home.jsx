/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import NoteCard from "../../Components/NoteCard/NoteCard";
import useGetNote from "../../Hooks/GetNoteHook";
import useRegisterHook from "../../Hooks/RegisterHook";
import { TokenContext } from "./../../Context/TokenContext";
import NoteModal from "../../Components/NoteModal/NoteModal";
import { RiLoader5Fill } from "react-icons/ri";

export default function Home() {
  const [notesList, setNotesList] = useState([]);
  const { token } = useContext(TokenContext);
  const { data, error, isLoading, isError } = useGetNote(token);
  useEffect(() => {
    if (data?.notes) {
      console.log("Fetched notes:", data.notes);
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
          <NoteModal setNotesList={setNotesList} notesList={notesList} />
        </div>
        {isLoading ? (
          <div className="my-10 flex justify-center">
            <RiLoader5Fill className="animate-spin text-4xl " />
          </div>
        ) : isError ? (
          <div className="my-10 flex justify-center">
            <div
              className="capitalize p-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {error.response.data.msg}
            </div>
          </div>
        ) : (
          <div className="container mx-auto">
            <div className="row p-2 mx-7">
              {notesList?.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  setNotesList={setNotesList}
                  notesList={notesList}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
