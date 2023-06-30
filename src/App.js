// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import CountryMoreInfo from "./CountryMoreInfo";
import { GlobalProvider } from "./global";
import MainPage from "./MainPage";
import Navbar from "./Navbar";

const App = () => {
  return (
    <GlobalProvider>
      <header style={{ position: "sticky", top: "0", zIndex: "1" }}>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/country/:name" element={<CountryMoreInfo />} />
      </Routes>
    </GlobalProvider>
  );
};

export default App;
