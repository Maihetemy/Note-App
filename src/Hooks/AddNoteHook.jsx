/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddNote = (userToken) => {
  const AddNote = (note) => {
    console.log("Token in header:", `3b8ny__${userToken}`);
    console.log("Note data being sent:", note);

    return axios.post(
      "https://note-sigma-black.vercel.app/api/v1/notes",
      note,
      { headers: { token: `3b8ny__${userToken}` } }
    );
  };
  return useMutation({
    mutationKey: ["AddNote"],
    mutationFn: AddNote,
    select: (data) => data.data,
  });
};

export default useAddNote;
