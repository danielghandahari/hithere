import React from "react";
import styled from "styled-components";
import { shadow, secondColor } from "../utils/variables";

const Div = styled.div`
  width: 250px;
  height: 300px;
  border-radius: 30px;
  box-shadow: ${shadow};
  background-color: ${secondColor};
  padding: 30px;
`;

const CardView = ({ children }) => {
  return <Div>{children}</Div>;
};

export default CardView;
