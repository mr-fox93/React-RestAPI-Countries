import React, { useContext } from "react";
import styled from "styled-components";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import { GlobalContext } from "./global";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-family: "Nunito Sans", sans-serif;
  background-color: ${(props) => (props.swich ? "white" : "#2B3844")};
  color: ${(props) => (props.swich ? "black" : "white !important")};
`;

const LeftText = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const RightText = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 10px;
  font-family: "Nunito Sans", sans-serif;
`;

const Navbar = () => {
  const { swich, setSwich } = useContext(GlobalContext);
  console.log(swich);

  return (
    <NavbarContainer swich={swich}>
      <LeftText>Where in the world?</LeftText>
      <RightText onClick={() => setSwich(!swich)}>
        {swich ? <LightModeIcon /> : <NightsStayIcon />}Dark mode
      </RightText>
    </NavbarContainer>
  );
};

export default Navbar;
