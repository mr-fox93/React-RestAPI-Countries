import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [filtredRegion, setFiltredRegion] = useState([]);

  return (
    <GlobalContext.Provider value={{ filtredRegion, setFiltredRegion }}>
      {children}
    </GlobalContext.Provider>
  );
};
