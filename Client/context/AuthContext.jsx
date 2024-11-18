import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState([]);
  const [jwt, setJwt] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        jwt,
        setJwt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
