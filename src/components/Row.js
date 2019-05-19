import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fontColor } from "../utils/variables";

const Div = styled.div`
  display: flex;
  align-items: center;
  .text {
    margin-left: 10px;
    margin-top: 15px;
    font-size: 24px;
    font-weight: 900;
  }
`;

const Row = ({ children, icon }) => {
  return (
    <Div>
      <FontAwesomeIcon size={"2x"} icon={icon} color={fontColor} />
      <div className="text">{children}</div>
    </Div>
  );
};

export default Row;
