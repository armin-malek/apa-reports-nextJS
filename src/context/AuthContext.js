import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  role: "",
  setMyRole: (role) => {
    return;
  },
});

export function AuthProvider({ children }) {
  const [role, setRole] = useState();

  function reloadFromLocalStorage() {
    if (typeof window != "undefined") {
      //console.log("reload");
      let dbrole = localStorage.getItem("role");
      setRole(dbrole);
    }
  }

  function setMyRole(role) {
    localStorage.setItem("role", role);
    setRole(role);
  }

  useEffect(() => {
    reloadFromLocalStorage();

    setInterval(() => {
      reloadFromLocalStorage();
    }, 5000);
  }, []);
  const contextValue = { role: role, setMyRole };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
