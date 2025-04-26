import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useRegisterHook() {
  function registerMutationFn(userObj) {
    return axios.post(
      "https://note-sigma-black.vercel.app/api/v1/users/signUp",
      userObj
    ).then((response)=> response.data);
  }
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerMutationFn,
  });
}
