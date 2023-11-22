import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // here we will create reducer for the second user of which the chats will be seen in right side of webapp

  const INITIAL_STATE = { chatId: "null", user: {} };
  const chatReducer = (state, action) => {
    debugger
    switch (action.type) {
      case "CHANGE_USER":
        debugger
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state
    }
  };

  const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE)
  console.log(state);
  return (
    <ChatContext.Provider value={{ data:state,dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
