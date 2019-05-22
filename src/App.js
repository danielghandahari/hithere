import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import * as muli from "typeface-muli";
import {
  faWind,
  faArrowUp,
  faArrowDown,
  faBullhorn
} from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import { Center } from "./utils/style-components";
import CardView from "./components/Card";
import { fetchWeather, randomQuote } from "./utils/http-manager";
import { convertTimestampToTime, getPosition, jsUcfirst } from "./utils/utils";
import Row from "./components/Row";
import {
  fontColor,
  firstColor,
  secondColor,
  thirdColor,
  shadow
} from "./utils/variables";
import Calendar from "react-calendar";

const Global = createGlobalStyle`
  body {
    font-family: muli;
    color: ${fontColor};
  }
  ::selection {
    background: grey;
    color: #FAFAFA;
  }
`;

const Wrapper = styled.div`
  background-image: radial-gradient(${firstColor}, ${secondColor});
  width: 100%;
  min-height: 100vh;

  .weather-title {
    font-size: 26px;
    font-weight: 900;
    margin-bottom: 20px;
  }

  .quote-text {
    margin-top: -20px;
    font-size: 25px;
    font-weight: 900;
  }

  .quote-text p::before {
    content: "“ ";
    font-size: 25px;
    color: ${thirdColor};
  }

  .quote-text p::after {
    content: " ”";
    font-size: 25px;
    color: ${thirdColor};
  }

  .quote-author {
    font-size: 20px;
    font-weight: 600;
  }

  .calendar {
    width: 250px;
    height: 300px;
    border-radius: 30px;
    padding: 30px;
    box-sizing: content-box;

    box-shadow: ${shadow};
    background-color: ${secondColor};
  }

  .react-calendar__navigation__label {
    color: yellow;
  }
`;

function App() {
  const quoteRef = useRef(null);
  const quoteAuthorRef = useRef(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function setWeatherStates() {
      if (navigator.geolocation) {
        const {
          coords: { latitude, longitude }
        } = await getPosition();
        const newWeather = await fetchWeather(latitude, longitude);
        setWeather(newWeather);
      }
    }

    async function setQuoteState() {
      const data = await randomQuote();
      const { content, title } = data[0];
      quoteRef.current.innerHTML = content;
      quoteAuthorRef.current.innerHTML = `— ${title}`;
    }

    setQuoteState();
    setWeatherStates();
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
              <Row icon={faBullhorn}>
                {jsUcfirst(weather.weather[0].description)}
              </Row>
            </>
          ) : (
            "Loading..."
          )}
        </CardView>
        <CardView>
          <div className="quote-text" ref={quoteRef} />
          <div className="quote-author" ref={quoteAuthorRef} />
        </CardView>
        {/* <CardView /> */}
        <Calendar value={new Date()} className="calendar" />
      </Center>
    </Wrapper>
  );
}

export default App;
