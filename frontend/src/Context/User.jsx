"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const endPoint = "/user";
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }
      setUser(data.data);
      console.log(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = async () => {
    const endPoint = "/auth/logout";
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endPoint}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log("couldn't cleared cookie");
        return;
      }
      alert(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, handleLogout, show, setShow }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
