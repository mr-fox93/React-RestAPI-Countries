import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 264px;
  height: 336px;
  border-radius: 6px;
  background-color: white;
  overflow: hidden;
`;

const Image = styled.img`
  width: 264px;
  height: 160px;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const CountryInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const Info = styled.div`
  line-height: 0.4;
`;

const CountryCard = ({ country }) => {
  return (
    <>
      <Card>
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
