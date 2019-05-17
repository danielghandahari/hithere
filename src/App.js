import React from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import * as muli from "typeface-muli";

import Header from "./components/Header";
import Clock from "./components/Clock";
import { Center } from "./utils/style-components";

const Global = createGlobalStyle`
  body {font-family: muli;}
`;

const Wrapper = styled.div`
  background-image: radial-gradient(#ffefba, #ffffff);
  width: 100%;
  min-height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Global />
      <Header />
      <Center>
        <Clock />
      </Center>
    </Wrapper>
  );
}

export default App;
