import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 80px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 30px;
`;

const H1 = styled.h1`
  font-size: 2.25rem;
  margin-left: 1.5rem;
  /* font-family: Muli; */
`;

const Header = () => {
  return (
    <Wrapper>
      <H1>Hi, there</H1>
    </Wrapper>
  );
};

export default Header;
