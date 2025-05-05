/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddNote = (userToken) => {
  const AddNote = (note) => {
    return axios
      .post("https://note-sigma-black.vercel.app/api/v1/notes", note, {
        headers: { token: `3b8ny__${userToken}` },
      })
      .then((res) => res.data);
  };
  return useMutation({
    mutationKey: ["AddNote"],
    mutationFn: AddNote,
  });
};

export default useAddNote;
