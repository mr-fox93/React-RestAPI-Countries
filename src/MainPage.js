import "./App.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import styled from "styled-components";
import { useQuery } from "react-query";
import { GlobalContext } from "./global";
import SearchIcon from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Body = styled.body`
  min-height: 100vh;
  background: #fafafa;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;
`;

const SearchContener = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 3px;
  background: white;
`;

const Input = styled.input`
  border: none;
  width: 400px;
  height: 36px;
  padding-left: 10px;
  outline: none;
  background: white;
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

function MainPage() {
  const [region, setRegion] = useState("Choose region");
  const [value, setValue] = useState("");
  const { filtredRegion, setFiltredRegion } = useContext(GlobalContext);

  const { data, isLoading, error } = useQuery("countries", fetchFunction);

  useEffect(() => {
    if (!isLoading && data) {
      setFiltredRegion(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (data) {
      if (region !== "Choose region") {
        const res = data.filter((country) => country.region === region);
        setFiltredRegion(res);
      } else {
        setFiltredRegion(data);
        setRegion("Choose region");
      }
    }
  }, [region, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const selectRegion = (event) => {
    setRegion(event.target.value);
  };

  const searchCountry = filtredRegion.filter((country) => {
    return country.name.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <Body>
      <SearchContener>
        <InputWrapper>
          <SearchIcon />
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search for a country ..."
          />
        </InputWrapper>

        <Select
          value={region}
          onChange={selectRegion}
          style={{
            minWidth: "200px",
            marginLeft: "10px",
            height: "46px",
            background: "white",
          }}
        >
          <MenuItem value="Choose region">Choose region</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </Select>
      </SearchContener>

      <Wrapper>
        {searchCountry &&
          searchCountry.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
      </Wrapper>
    </Body>
  );
}

export default MainPage;
