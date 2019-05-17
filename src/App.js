import React from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";

const Wrapper = styled.div`
  background-image: radial-gradient(#ffefba, #ffffff);
  width: 100%;
  min-height: 100vh;
`;

function App() {
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
}

export default App;
