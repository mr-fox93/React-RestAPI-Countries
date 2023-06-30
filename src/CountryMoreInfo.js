import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "./global";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  justify-content: space-between;
  padding: 2rem;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 2rem;
  margin-top: 25px;
`;

const RightSide = styled.div`
  display: flex;
  gap: 75px;
  padding: 0.5rem;
`;

const RightSideLeft = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 0.4;
`;

const RightSideRight = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 0.4;
`;

const BorderCountries = styled.div`
  padding: 0.5rem;
`;

const CountryMoreInfo = () => {
  const { filtredRegion } = useContext(GlobalContext);
  const { name } = useParams();
  const navigate = useNavigate();

  const country = filtredRegion.find(
    (count) => count.name.toLowerCase() === name.toLowerCase()
  );

  if (!country) {
    return <div>No country found</div>;
  }

  return (
    <Wrapper>
      <LeftSide>
        <Button onClick={() => navigate("/")}>Back</Button>
        <img
          style={{ width: "560px", height: "401px", borderRadius: "6px" }}
          src={country.flag}
          alt={country.name}
        />
      </LeftSide>
      <Info>
        <h1>{country.name}</h1>
        <RightSide>
          <RightSideLeft>
            <p>Native Name: {country.nativeName}</p>
            <p>Population: {country.population}</p>
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
        <BorderCountries>
          <p>Border Countries: {country.borders}</p>
        </BorderCountries>
      </Info>
    </Wrapper>
  );
};

export default CountryMoreInfo;
