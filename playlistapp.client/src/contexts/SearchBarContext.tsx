import { SearchBarContextInterface } from "@/@types/searchbar";
import React, { FC, ReactNode, useState } from "react";

export const SearchBarContext =
  React.createContext<SearchBarContextInterface>({
    searchQuery: "",
    setSearchQuery: () => {}
  });

export const SearchBarProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchBarContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};
