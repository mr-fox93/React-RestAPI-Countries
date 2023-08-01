import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [filtredRegion, setFiltredRegion] = useState([]);
  const [swich, setSwich] = useState(true);

  return (
    <GlobalContext.Provider
      value={{ filtredRegion, setFiltredRegion, swich, setSwich }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
