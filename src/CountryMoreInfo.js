import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "./global";
import styled from "styled-components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Body = styled.body`
  min-height: 100vh;
  background-color: ${(props) => (props.swich ? "white" : "#2B3844")};
  color: ${(props) => (props.swich ? "black" : "white !important")};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2rem;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 65px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 2rem;
  margin-top: 65px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: 75px;
  padding: 0.5rem;
  margin-top: 65px;
`;

const RightSideLeft = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const RightSideRight = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`;

const BorderCountries = styled.div`
  padding: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 8px;
  font-weight: bold;
`;

const CountryMoreInfo = () => {
  const { filtredRegion } = useContext(GlobalContext);
  const { swich } = useContext(GlobalContext);
  const { name } = useParams();
  const navigate = useNavigate();

  const country = filtredRegion.find(
    (count) => count.name.toLowerCase() === name.toLowerCase()
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!country) {
    return <div>No country found</div>;
  }

  return (
    <Body swich={swich}>
      <Wrapper isMobile={isMobile}>
        <LeftSide>
          <ButtonContainer onClick={() => navigate("/")}>
            <KeyboardBackspaceIcon />
            Back
          </ButtonContainer>
          <img
            style={{
              width: `${isMobile ? "100%" : "500px"}`,
              height: `${isMobile ? "100%" : "350px"}`,
              borderRadius: "6px",
            }}
            src={country.flag}
            alt={country.name}
          />
        </LeftSide>
        <Info>
          <h1>{country.name}</h1>
          <RightSide isMobile={isMobile}>
            <RightSideLeft>
              <p>Native Name: {country.nativeName}</p>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Region: {country.region}</p>
              <p>Sub Region:{country.subregion}</p>
              <p>Capital: {country.capital}</p>
            </RightSideLeft>
            <RightSideRight>
              <p>Top Level Domain: {country.topLevelDomain}</p>
              <p>Currencies : {country.currencies}</p>
              <p>Languages : {country.languages}</p>
            </RightSideRight>
          </RightSide>
          <BorderCountries></BorderCountries>
        </Info>
      </Wrapper>
    </Body>
  );
};

export default CountryMoreInfo;
