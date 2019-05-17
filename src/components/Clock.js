import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { startTime } from "../utils/utils";

const Div = styled.div`
  font-size: 10rem;
  font-weight: 700;
  transition: all 1s ease;
`;

const Clock = () => {
  const clockRef = useRef(null);
  useEffect(() => {
    if (clockRef !== undefined) startTime(clockRef);
  }, []);
  return <Div ref={clockRef} />;
};

export default Clock;
