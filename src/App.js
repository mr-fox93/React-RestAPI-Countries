// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import CountryMoreInfo from "./CountryMoreInfo";
import { GlobalProvider } from "./global";
import MainPage from "./MainPage";

const App = () => {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/country/:name" element={<CountryMoreInfo />} />
      </Routes>
    </GlobalProvider>
  );
};

export default App;
