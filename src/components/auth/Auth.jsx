import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  if (token) {
    localStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let data = JSON.parse(localStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  useEffect(() => {
    console.log(token);
  }, [token]);

  const value = {
    token,
    setToken,
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
