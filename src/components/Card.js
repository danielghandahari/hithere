import React from "react";
import styled from "styled-components";
import { shadow } from "../utils/variables";

const Div = styled.div`
  width: 250px;
  height: 300px;
  border-radius: 30px;
  box-shadow: ${shadow};
  background-color: #fafafa;
`;

const CardView = ({ children }) => {
  return <Div>{children}</Div>;
};

export default CardView;
