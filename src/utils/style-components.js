import styled from "styled-components";

export const Center = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const H1 = styled.h1`
  font-size: 3.25rem;
  font-weight: 900;
  margin-left: ${props => props.marginLeft};
`;
