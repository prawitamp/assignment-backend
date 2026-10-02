"use client";

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        message,
        setMessage,
        submitted,
        setSubmitted,
        resetForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
