import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useDeleteNoteHook = (userToken) => {
  const deleteNoteFn = (id) => {
    console.log(id);
    console.log(userToken);
    
    return axios.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      { headers: {token: `3b8ny__${userToken}`} }
    );
  };
  return useMutation({
    mutationKey: ["DeleteNote"],
    mutationFn: deleteNoteFn,
  });
};

export default useDeleteNoteHook;
