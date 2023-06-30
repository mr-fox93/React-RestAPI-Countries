import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./global";

const Card = styled.div`
  width: 264px;
  height: 336px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-family: "Nunito Sans", sans-serif;
  background-color: ${(props) => (props.swich ? "white" : "#2B3844")};
  color: ${(props) => (props.swich ? "black" : "white !important")};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled.img`
  width: 264px;
  height: 160px;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const CountryInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const Info = styled.div`
  line-height: 0.5;
`;

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const { swich } = useContext(GlobalContext);

  const handleClick = () => {
    navigate(`/country/${country.name}`);
  };

  return (
    <>
      <Card onClick={handleClick} swich={swich}>
        <Image src={country.flag} />

        <CountryInfoSection>
          <Name>{country.name}</Name>
          <Info>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital:{country.capital}</p>
          </Info>
        </CountryInfoSection>
      </Card>
    </>
  );
};

export default CountryCard;
