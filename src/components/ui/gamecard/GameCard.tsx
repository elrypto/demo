import React from 'react';
import styled from 'styled-components';
import { Category } from '../../../common/Style';
import { FixedGameCardBox } from './GameCardStyle';
import DangerousInnerContent from '../DangerouseInnerContent';

interface GameCardProps {
  category: string;
  question: string;
}

const GameCardContainer = styled.div``;

export const GameCard: React.FC<GameCardProps> = ({
  category,
  question,
}: GameCardProps) => {

  return (
    <GameCardContainer>
      <Category>{category}</Category>
      <FixedGameCardBox>
        <DangerousInnerContent htmlContent={question} />
      </FixedGameCardBox>
    </GameCardContainer>
  );
};
