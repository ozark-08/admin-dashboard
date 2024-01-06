import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log("isLoggedIn", isLoggedIn);

  //tackling logout
  const LogoutUser = () => {
    setToken(" ");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
