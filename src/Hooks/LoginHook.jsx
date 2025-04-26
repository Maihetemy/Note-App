import { useMutation } from "@tanstack/react-query";
import axios from "axios";
export default function useLoginHook() {
  function loginMutationFn(userObj) {
    return axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", userObj)
      .then((response) => response.data);
  }
  return useMutation({
    mutationKey: "Login",
    mutationFn: loginMutationFn,
  });
}
