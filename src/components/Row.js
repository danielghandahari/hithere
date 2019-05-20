import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { thirdColor } from "../utils/variables";

const Div = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  .text {
    margin-left: 20px;
    font-size: 24px;
    font-weight: 900;
  }
`;

const Row = ({ children, icon }) => {
  return (
    <Div>
      <FontAwesomeIcon size={"2x"} icon={icon} color={thirdColor} />
      <div className="text">{children}</div>
    </Div>
  );
};

export default Row;
