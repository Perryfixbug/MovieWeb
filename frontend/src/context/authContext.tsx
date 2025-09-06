"use client";
import { fetchClient, fetchServer } from "@/lib/api";
import React, { useContext, createContext, useState, useLayoutEffect, useEffect } from "react";

export const AuthContext = createContext<any>(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType | null>(null)
  const login = async (data: any) => {
    const res = await fetchServer("/auth/login", "POST", {
      username: data.username,
      password: data.password,
    });
    localStorage.setItem("accessToken", res.accessToken);
    const user = await fetchClient("/user/me");
    setUserInfo(user)
    setIsAuth(true);
  };
  const signup = async (data: any) => {
    const res = await fetchServer("/auth/signup", "POST", {
      fullname: data.fullname,
      email: data.email,
      username: data.username,
      password: data.password,
    });
    localStorage.setItem("accessToken", res.accessToken);
    const user = await fetchClient("/user/me");
    setUserInfo(user)
    setIsAuth(true);
  };
  const logout = async () => {
    await fetchServer("/auth/logout", "DELETE");
    setUserInfo(null)
    setIsAuth(false);
  };
  useEffect(() => {
    async function refresh() {
      try {
        const res = await fetchServer("/auth/refresh");
        if (!res.accessToken) return;
        localStorage.setItem("accessToken", res.accessToken);

        // Song song fetch
        const [user] = await Promise.all([
          fetchClient("/user/me")
        ]);

        setUserInfo(user)
        setIsAuth(true);
      } catch (e) {
        localStorage.removeItem("accessToken");
        setUserInfo(null);
        setIsAuth(false);
      }
    }
    refresh();
  }, []);

  const contextValue = React.useMemo(() => ({
    login,
    logout,
    signup,
    isAuth,
    userInfo,
    setUserInfo
  }), [isAuth, userInfo]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
