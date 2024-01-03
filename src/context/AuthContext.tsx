import { createContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { BASE_API_URL } from "../helpers/url";
import { useToast } from "@chakra-ui/react";
import { Authentication, Meta, User } from "../models/Authentication";

export interface AuthContextValue {
  isLoggedIn: boolean;
  isLoading: boolean;
  isLoginLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  authCheck: () => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
  isLoggedIn: false,
  isLoading: true,
  isLoginLoading: false,
  login: () => {},
  logout: () => {},
  authCheck: () => {},
  user: null,
});

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();

  const login = (email: string, password: string) => {
    setIsLoginLoading(true);
    axios
      .post(BASE_API_URL + "/login", {
        email: email,
        password: password,
      })
      .then((res: AxiosResponse) => {
        const data: Authentication = res.data;
        if (data.data?.user?.role == "member") {
          setUser(data.data.user as User);
          Cookies.set("userToken", data.data.access_token?.token as string, {
            expires: 7,
          });
          setIsLoggedIn(true);
          setIsLoginLoading(false);
        } else {
          toast({
            title: "Error !",
            description: data.meta?.message,
            status: "error",
            variant: "subtle",
            position: "top",
            isClosable: true,
          });
          setIsLoggedIn(false);
          setIsLoginLoading(false);
        }
      })
      .catch((err: AxiosError) => {
        const errorResp: Meta = err.response?.data ?? "";

        if (err.code == "ERR_NETWORK") {
          toast({
            title: "Network error!",
            status: "error",
            variant: "subtle",
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: errorResp.message,
            status: "error",
            variant: "subtle",
            position: "top",
            isClosable: true,
          });
        }
        setIsLoggedIn(false);
        setIsLoginLoading(false);
      });
  };

  const logout = () => {
    const token = Cookies.get("userToken");

    axios
      .post(BASE_API_URL + "/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Cookies.remove("userToken");
        setIsLoggedIn(false);
        setIsLoading(false);
      })
      .catch(() => {
        Cookies.remove("userToken");
        setIsLoggedIn(false);
        setIsLoading(false);
        // toast({
        //   title: "Logout failed, something error!",
        //   status: "error",
        //   variant: "subtle",
        //   position: "top",
        //   isClosable: true,
        // });
      });
  };

  const authCheck = () => {
    setIsLoading(true);
    const token = Cookies.get("userToken");
    axios
      .get(BASE_API_URL + "/user-profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        const user: User = res.data;
        setUser(user);

        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isLoading,
        user,
        isLoginLoading,
        authCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
