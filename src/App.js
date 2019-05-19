import React, { useState, useEffect } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import * as muli from "typeface-muli";

import Header from "./components/Header";
import { Center } from "./utils/style-components";
import CardView from "./components/Card";
import { fetchWeather } from "./utils/http-manager";
import { convertTimestampToTime } from "./utils/utils";

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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          const newWeather = await fetchWeather(
            position.coords.latitude,
            position.coords.longitude
          );

          console.log({ newWeather });

          setWeather(newWeather);
        });
      }
    }

    setWeatherState();
  }, []);

  return (
    <Wrapper>
      <Global />
      <Header />
      <Center>
        <CardView>
          <div>{weather ? weather.main.temp : "Loading..."}</div>
          <div>{weather ? weather.name : "Loading..."}</div>
          <div>{weather ? weather.weather[0].description : "Loading..."}</div>
          <div>
            {weather
              ? convertTimestampToTime(weather.sys.sunrise)
              : "Loading..."}
          </div>
          <div>
            {weather
              ? convertTimestampToTime(weather.sys.sunset)
              : "Loading..."}
          </div>
          <div>{weather ? weather.wind.speed : "Loading..."}</div>
        </CardView>
        <CardView />
        <CardView />
      </Center>
    </Wrapper>
  );
}

export default App;
