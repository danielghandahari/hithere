import React from "react";
import styled from "styled-components";
import { H1 } from "../utils/style-components";
import Battery from "./Battery";
import Clock from "./Clock";
import { shadow } from "../utils/variables";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  width: 100%;
  height: 120px;
  box-shadow: ${shadow};
  border-bottom-left-radius: 30px;
`;

const Header = () => {
  const batteryApiExists = !!navigator.getBattery;

  return (
    <Wrapper>
      <H1 marginLeft="2rem">Hi, there</H1>
      <Clock />
      {batteryApiExists ? <Battery /> : null}
    </Wrapper>
  );
};

export default Header;
