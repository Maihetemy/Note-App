/* eslint-disable no-unused-vars */
import { createContext, useEffect } from "react";
import { useState } from "react";

export let TokenContext = createContext(0);

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("NoteAppToken")) {
      setToken(localStorage.getItem("NoteAppToken"));
    }
  }, []);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
