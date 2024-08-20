import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { createContext, ReactNode, useContext } from "react";
type AuthContext = {};
type User = {
  id: string;
  name: string;
  image?: string;
};
const Context = createContext<AuthContext | null>(null);
const useAuth = () => {
  return useContext(Context);
};

type AuthProviderProps = {
  children: ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps) => {
  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
  });
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
