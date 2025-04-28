/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetNote = (userToken) => {
  const getNoteFn = () => {
    return axios.get("https://note-sigma-black.vercel.app/api/v1/notes", {
      headers: { token: `3b8ny__${userToken}` },
    });
  };
  return useQuery({
    queryKey: ["getNote"],
    queryFn: getNoteFn,
    select: (data) => data.data,
    enabled: !!userToken,
  });
};

export default useGetNote;
