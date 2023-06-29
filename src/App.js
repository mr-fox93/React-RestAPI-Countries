import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import styled from "styled-components";
import { useQuery } from "react-query";

const Body = styled.body`
  min-height: 100vh;
  background: grey;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;
`;

const fetchFunction = async () => {
  const res = await axios.get(`https://restcountries.com/v3.1/all`);
  const result = res.data.map((country) => {
    return {
      name: country.name?.common || "",
      flag: country.flags?.svg || "",
      population: country.population || "",
      region: country.region || "",
      capital: country.capital ? country.capital[0] : "",
      nativeName: country.name?.nativeName
        ? Object.values(country.name.nativeName)[0].official
        : "",
      subregion: country.subregion || "",
      topLevelDomain: country.tld ? country.tld[0] : "",
      currencies: country.currencies
        ? Object.values(country.currencies)
            .map((curr) => curr.name)
            .join(", ")
        : "",
      languages: country.languages
        ? Object.values(country.languages)
            .map((lang) => lang)
            .join(", ")
        : "",
      borders: country.borders || [],
    };
  });
  return result;
};

function App() {
  const [region, setRegion] = useState("");
  const [value, setValue] = useState("");
  const [filtredRegion, setFiltredRegion] = useState([]);

  const { data, isLoading, error } = useQuery("countries", fetchFunction);

  useEffect(() => {
    if (!isLoading && data) {
      setFiltredRegion(data);
    }
  }, [data, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const selectRegion = (event) => {
    setRegion(event.target.value);

    if (event.target.value !== "") {
      const res = data.filter((contry) => contry.region === event.target.value);
      setFiltredRegion(res);
    } else {
      setFiltredRegion(data);
    }
  };

  const searchCountry = filtredRegion.filter((country) => {
    return country.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <Body>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="search by country"
      />
      <select name="region" value={region} onChange={selectRegion}>
        <option value="">Choose region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <Wrapper>
        {searchCountry &&
          searchCountry.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
      </Wrapper>
    </Body>
  );
}

export default App;

/*
  useEffect(() => {
    if (data) {
      setFiltredRegion(data);
    }
  }, [data]);
*/
