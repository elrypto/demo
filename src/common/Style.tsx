import React from 'react';
import styled from 'styled-components';

export const TinySpacer = styled.span`
  margin-left: 0.5rem;
`;

export const DivSpacer = styled.div`
  margin-top: 1em;
`;

export const VContainer = styled.div`
  border: 1px solid lightgrey;
  padding: 0.75rem;
`;

export const DivBox = styled.div`
  border: 1px solid lightblue;
  margin: 1rem;
  padding: 0.5rem;
`;

export const Category = styled.h4`
  color: #0b3658;
  padding-top: 1.5rem;
  margin-top: 1rem;
  text-align: center;
  height: 70px;
`;

export const GameCardBox = styled.div`
  margin: 2rem;
  border: 1px solid lightblue;
  padding: 1em;
  font-size: 120%;
  background-color: white;
  border-radius: 10px;
}
`;

interface Props {
  children: any;
}

export const RightAlignCol: React.FC<Props> = ({ children }) => {
  const FlexBoxRight = styled.div`
  display: flex
  align-items: right;
  padding-right: 1em;
`;
  return <FlexBoxRight>{children}</FlexBoxRight>;
};

export const SimplePage: React.FC<Props> = ({ children }) => {
  const Container = styled.div`
    margin: 7rem 2rem 2rem;
    border: 1px solid lightgrey;
    padding: 0.75rem;
    background-color: rgb(245, 250, 251);
    border-radius: 25px;
    box-shadow: 3px 6px 5px #dddada;
  `;

  return <Container>{children}</Container>;
};
