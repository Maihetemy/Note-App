/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import style from "./NoteCard.module.css";
import { FaTrash } from "react-icons/fa";
import { RiStickyNoteFill } from "react-icons/ri";
import PropTypes from "prop-types";
import useDeleteNoteHook from "./../../Hooks/DeleteNoteHook";
import { useContext } from "react";
import { TokenContext } from "./../../Context/TokenContext";
import { RiLoader5Fill } from 'react-icons/ri';

export default function NoteCard({ note, setNotesList, notesList }) {
  const { token } = useContext(TokenContext);
  const {
    mutate: deleteNote,
    data: deleteNoteData,
    isPending: isDeleting,
    error: deleteNoteError,
    isLoading: isDeleteLoading,
  } = useDeleteNoteHook(token);

  const deleteNoteFn = (id) => {
    deleteNote(id, {
      onSuccess: (addNoteData) => {
        setNotesList((oldState) => {
          return oldState.filter((note) => note._id !== id);
        });
      },
    });
  };

  return (
    <>
      <div className="w-1/2 md:w-1/3 lg:w-1/4 p-1.5">
        <div className=" default-background my-1 p-3 rounded-2xl">
          <h2 className="capitalize text-2xl font-semibold my-3">
            {note.title}
          </h2>
          <div className="flex justify-around w-full my-3 text-xl">
            {isDeleting ? (
              <RiLoader5Fill className="animate-spin text-xl " />
            ) : (
              <FaTrash
                onClick={() => deleteNoteFn(note._id)}
                className="text-red-700 cursor-pointer"
              />
            )}

            <RiStickyNoteFill className="text-green-700 cursor-pointer" />
          </div>
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
          <p>{note.content}</p>
        </div>
      </div>
    </>
  );
}
NoteCard.PropTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};
