import styled from "styled-components";

export const Center = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    > * {
      margin-top: 5rem;
    }

    > *:last-of-type {
      margin-bottom: 7rem;
    }
  }
`;

export const H1 = styled.h1`
  font-size: 3.25rem;
  font-weight: 900;
  white-space: nowrap;
  margin-left: ${props => props.marginLeft};
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
