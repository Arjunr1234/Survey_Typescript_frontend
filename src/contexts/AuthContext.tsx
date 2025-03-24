import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface AuthContextType {
  isUserLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  setIsUserLoggedIn: (value: boolean) => void;
  setAdminLoggedIn: (value: boolean) => void;
  logoutUser: () => void;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(
    localStorage.getItem("user") === "true"
  );
  const [isAdminLoggedIn, setAdminLoggedIn] = useState<boolean>(
    localStorage.getItem("admin") === "true"
  );

  useEffect(() => {
    localStorage.setItem("user", String(isUserLoggedIn));
    localStorage.setItem("admin", String(isAdminLoggedIn));
  }, [isUserLoggedIn, isAdminLoggedIn]);

  const logoutUser = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
  };

  const logoutAdmin = () => {
    setAdminLoggedIn(false);
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        isAdminLoggedIn,
        setIsUserLoggedIn,
        setAdminLoggedIn,
        logoutUser,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
