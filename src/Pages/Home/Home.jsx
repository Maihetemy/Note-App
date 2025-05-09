/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import NoteCard from "../../Components/NoteCard/NoteCard";
import useGetNote from "../../Hooks/GetNoteHook";
import useRegisterHook from "../../Hooks/RegisterHook";
import { TokenContext } from "./../../Context/TokenContext";
import NoteModal from "../../Components/NoteModal/NoteModal";
import { RiLoader5Fill } from "react-icons/ri";
import { ModalOpeningContext } from './../../Context/ModalOpening';

export default function Home() {
  const [notesList, setNotesList] = useState([]);
  const { token } = useContext(TokenContext);
  const { data, error, isLoading, isError } = useGetNote(token);
  
  // modal settings
  const { addNewNote, setAddNewNote, editingModel, setEditingModel } = useContext(ModalOpeningContext);

  useEffect(() => {
    if (data?.notes) {
      console.log("Fetched notes:", data.notes);
      setNotesList(data?.notes);
    }
  }, [token, data]);
  const openAddModal = () => {
    // setIsModalOpen(true);
    setAddNewNote(true);
    setEditingModel(false);
  };
  return (
    <>
      <div className="my-10">
        <div className="text-center flex justify-center my-5">
          <h1 className="capitalize inline-block me-3 text-4xl font-semibold">
            Mai's Notes
          </h1>
          {/* Modal toggle */}
          <button
            data-modal-target="default-modal"
            // data-modal-toggle="default-modal"
            className="capitalize cursor-pointer block text-nowrap text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => openAddModal(true)}
          >
            add button
          </button>
          {/* Main modal */}
          <NoteModal
            setNotesList={setNotesList}
            notesList={notesList}
          />
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
              {error?.response?.data?.msg}
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
                  // editingModel={editingModel}
                  // setEditingModel={setEditingModel}
                  // IsModalOpen={isModalOpen}
                  // setIsModalOpen={setIsModalOpen}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
