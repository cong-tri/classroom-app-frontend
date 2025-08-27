import { createContext, useContext, useState, ReactNode } from "react";
// import { handleGetUserInfoFromJWT } from "../utils";
import { User } from "../interfaces";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, phoneNumber: string) => void;
  logout: () => void;
  getUserInfo: () => User | null;
}

const PHONE_NUMBER_VERIFY: string = import.meta.env
  .VITE_PHONE_NUMBER_VERIFY as string;
const USER_TOKEN_VERIFY: string = import.meta.env
  .VITE_USER_TOKEN_VERIFY_VERIFY as string;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    JSON.parse(localStorage.getItem(USER_TOKEN_VERIFY) ?? "false")
  );
  localStorage.setItem(USER_TOKEN_VERIFY, JSON.stringify("test"));

  const login = (token: string, phoneNumber: string) => {
    localStorage.setItem(PHONE_NUMBER_VERIFY, JSON.stringify(phoneNumber));
    localStorage.setItem(USER_TOKEN_VERIFY, JSON.stringify(token));
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem(PHONE_NUMBER_VERIFY);
    localStorage.removeItem(USER_TOKEN_VERIFY);
  };

  const getUserInfo = (): User | null => {
    const token = JSON.parse(localStorage.getItem(USER_TOKEN_VERIFY) || "null");
    if (!token) return null;
    // const userInfo = handleGetUserInfoFromJWT(token);
    // if (!userInfo) return null;
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
