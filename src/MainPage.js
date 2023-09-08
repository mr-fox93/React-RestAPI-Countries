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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Body = styled.body`
  min-height: 100vh;
  background: ${({ swich }) => (swich ? "#fafafa" : "#202C36")};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 80px;
`;

const SearchContener = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  justify-content: ${({ isMobile }) => (isMobile ? "center" : "space-between")};
  align-items: center;
  padding: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 3px;
  background-color: ${(props) => (props.swich ? "white" : "#2B3844")};
`;

const Input = styled.input`
  border: none;
  width: ${({ isMobile }) => (isMobile ? "80%" : "300px")};
  height: 36px;
  padding-left: 10px;
  outline: none;
  background-color: ${(props) => (props.swich ? "white" : "#2B3844")};
  color: ${(props) => (props.swich ? "black" : "white !important")};
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
  const { filtredRegion, setFiltredRegion, swich } = useContext(GlobalContext);

  const { data, isLoading, error } = useQuery("countries", fetchFunction);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Body swich={swich}>
      <SearchContener isMobile={isMobile}>
        <InputWrapper swich={swich}>
          <SearchIcon />
          <Input
            swich={swich}
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
            background: `${swich ? "white" : "#2B3844"}`,
            marginTop: `${isMobile ? "20px" : "0px"}`,
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
