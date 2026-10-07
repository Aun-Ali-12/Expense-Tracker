"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const route = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const endPoint = "/api/proxy/user";
    try {
      const res = await fetch(endPoint, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return;
      }
      setUser(data.data);
    } catch (err) {
      return err.message;
    }
  };

  const handleLogout = async () => {
    const endPoint = "/api/auth/logout";
    setIsLoggingOut(true);
    try {
      const res = await fetch(endPoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setIsLoggingOut(false);
        return;
      }
      toast.success("logged out successfully");
      route.push("/login");
      setIsLoggingOut(false);
    } catch (err) {
      setIsLoggingOut(false);
      return err.message;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, getUser, handleLogout, show, setShow, isLoggingOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
