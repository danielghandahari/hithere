import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { startTime } from "../utils/utils";

const Div = styled.div`
  font-size: 3rem;
  font-weight: 700;
  transition: all 1s ease;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Clock = () => {
  const clockRef = useRef(null);
  useEffect(() => {
    if (clockRef) startTime(clockRef);
  }, []);
  return <Div ref={clockRef} />;
};

export default Clock;
