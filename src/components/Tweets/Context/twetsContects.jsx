import React, { createContext, useContext, useState } from "react";

export const AllUsers = createContext();
export const useTweetContext = () => useContext(AllUsers);

const TweetsContext = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AllUsers.Provider
      value={{
        users,
        setUsers,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AllUsers.Provider>
  );
};
export default TweetsContext;
