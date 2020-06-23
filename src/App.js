import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import * as muli from "typeface-muli";
import {
  faWind,
  faArrowUp,
  faArrowDown,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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
  shadow,
} from "./utils/variables";
import Calendar from "react-calendar";

const Global = createGlobalStyle`
  html, body {
    background-color: ${secondColor};
    font-family: muli;
    color: ${fontColor};
  }
  ::selection {
    background: #FF8008;
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
    border: none;
    padding: 30px;
    box-sizing: content-box;

    box-shadow: ${shadow};
    background-color: ${secondColor};
  }

  .react-calendar__navigation__label {
    color: ${fontColor};
    font-size: 26px;
    font-weight: 900;
  }

  .react-calendar__navigation__arrow {
    display: none;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    color: grey;
  }

  .react-calendar__tile {
    color: ${fontColor};
    font-size: 14px;
    font-weight: bold;
    border
  }

  .react-calendar__tile:hover {
    color: #fafafa;
    background: grey !important;
    border-radius: 0.5rem;
  }

  .react-calendar__tile--active {
    color: #fafafa;
    background: ${thirdColor} !important;
    border-radius: 0.5rem;
  }

  .react-calendar__tile--active:hover {
    background: ${thirdColor} !important;
  }

  .react-calendar__tile--hasActive {
    color: #fafafa;
    background: ${thirdColor} !important;
    border-radius: 0.5rem;import { axios } from 'axios';

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
          coords: { latitude, longitude },
        } = await getPosition();

        const newWeather = await fetchWeather(latitude, longitude);
        const res = await axios.get(
          `/.netlify/functions/fetchWeather?latitude=${latitude}&longitude=${longitude}`
        );

        setWeather(newWeather);
      }
    }

    async function setQuoteState() {
      const { data } = await axios.get("/.netlify/functions/randomQuote");
      if (data) {
        const { content, title } = data[0];
        quoteRef.current.innerHTML = content;
        quoteAuthorRef.current.innerHTML = `— ${title}`;
      }
    }

    setQuoteState();
    setWeatherStates();

    // Toggle favicon if tab visible
    window.addEventListener("visibilitychange", () => {
      let link =
        document.querySelector("link[rel*='icon']") ||
        document.createElement("link");

      if (document.hidden) {
        link.href = "offline_favicon.ico";
      } else {
        link.href = "favicon.ico";
      }
      document.getElementsByTagName("head")[0].appendChild(link);
    });
  }, []);

  return (
    <Wrapper>
      <Global />
      <Header />
      <Center>
        {weather && (
          <CardView>
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
          </CardView>
        )}
        {/* <CardView>
          <div className="quote-text" ref={quoteRef} />
          <div className="quote-author" ref={quoteAuthorRef} />
        </CardView> */}
        {/* <CardView /> */}
        <Calendar
          showNeighboringMonth={false}
          value={new Date()}
          className="calendar"
        />
      </Center>
    </Wrapper>
  );
}

export default App;
