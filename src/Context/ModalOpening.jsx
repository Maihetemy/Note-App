/* eslint-disable no-unused-vars */
import { createContext, useEffect } from "react";
import { useState } from "react";

export let ModalOpeningContext = createContext(0);

export default function ModalOpeningProvider(props) {
  const [addNewNote, setAddNewNote] = useState(false);
  const [editingModel, setEditingModel] = useState(false);
  const [noteEdited, setNoteEdited] = useState(null);

  return (
    <ModalOpeningContext.Provider
      value={{
        addNewNote,
        setAddNewNote,
        editingModel,
        setEditingModel,
        noteEdited,
        setNoteEdited,
      }}
    >
      {props.children}
    </ModalOpeningContext.Provider>
  );
}
