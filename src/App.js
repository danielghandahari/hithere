import React, { useState, useEffect } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import * as muli from "typeface-muli";

import Header from "./components/Header";
import { Center } from "./utils/style-components";
import CardView from "./components/Card";
import { fetchWeather } from "./utils/http-manager";

const Global = createGlobalStyle`
  body {font-family: muli;}
  ::selection {
    background: grey;
    color: #FAFAFA;
  }
`;

const Wrapper = styled.div`
  background-image: radial-gradient(#ffefba, #ffffff);
  width: 100%;
  min-height: 100vh;
`;

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function setWeatherState() {
      console.log("WEATHER", await fetchWeather());
    }

    setWeatherState();
  }, []);

  return (
    <Wrapper>
      <Global />
      <Header />
      <Center>
        <CardView>
          <div>{weather ? weather.coords : "TODO"}</div>
        </CardView>
        <CardView />
        <CardView />
      </Center>
    </Wrapper>
  );
}

export default App;
