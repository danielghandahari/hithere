import React, { useState, useEffect } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import * as muli from "typeface-muli";
import {
  faWind,
  faArrowUp,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import { Center } from "./utils/style-components";
import CardView from "./components/Card";
import { fetchWeather } from "./utils/http-manager";
import { convertTimestampToTime, getPosition } from "./utils/utils";
import Row from "./components/Row";

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

  .weather-title {
    font-size: 26px;
    font-weight: 900;
    margin-bottom: 20px;
  }

  .weather-desc {
    font-size: 20px;
    font-weight: 900;
    margin-top: 15px;
  }
`;

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function setWeatherState() {
      if (navigator.geolocation) {
        const {
          coords: { latitude, longitude }
        } = await getPosition();
        const newWeather = await fetchWeather(latitude, longitude);
        setWeather(newWeather);
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
          {weather ? (
            <>
              <div className="weather-title">{`${weather.name}, ${Math.round(
                weather.main.temp
              )}°C`}</div>
              <Row icon={faWind}>{`${weather.wind.speed}m/s`}</Row>
              <Row icon={faArrowUp}>
                {convertTimestampToTime(weather.sys.sunrise)}
              </Row>
              <Row icon={faArrowDown}>
                {convertTimestampToTime(weather.sys.sunset)}
              </Row>
              <div className="weather-desc">
                {`${weather.weather[0].description}.`}
              </div>
            </>
          ) : (
            "Loading..."
          )}
        </CardView>
        <CardView />
        <CardView />
      </Center>
    </Wrapper>
  );
}

export default App;
