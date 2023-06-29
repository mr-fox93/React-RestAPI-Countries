import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "./global";

const CountryMoreInfo = () => {
  const { filtredRegion } = useContext(GlobalContext);
  const { name } = useParams();

  const country = filtredRegion.find(
    (count) => count.name.toLowerCase() === name.toLowerCase()
  );

  if (!country) {
    return <div>No country found</div>;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Native Name: {country.nativeName}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Sub Region:{country.subregion}</p>
      <p>Capital: {country.capital}</p>
      <p>Top Level Domain: {country.topLevelDomain}</p>
      <p>Currencies : {country.currencies}</p>
      <p>Languages : {country.languages}</p>
      <p>Border Countries: {country.borders}</p>
    </div>
  );
};

export default CountryMoreInfo;
