/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loggedInUser } from "@/actions/auth/me";
import { createContext, useContext, useEffect, useState } from "react";

interface authContextprops {
  user: null | any;
  isLoggedIn: boolean;
  loader: boolean;
}

const initialState: authContextprops = {
  user: null,
  isLoggedIn: false,
  loader: true,
};

const authContext = createContext<authContextprops | null>(initialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);

  const fetchUser = async () => {
    try {
      const user = await loggedInUser();
      if (user.status === 200) {
        setUser(user.user);
        setIsLoggedIn(true);
        setLoader(false);
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ user, isLoggedIn, loader }}>
      {children}
    </authContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};

export { useAuthContext, AuthContextProvider };
