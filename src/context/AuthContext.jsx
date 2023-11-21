// import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//   }, []);

//   <AuthContext.Provider value={{currentUser}}>
//     <h1>this is from the context provider</h1>
//     {children}
//   </AuthContext.Provider>
// };

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};