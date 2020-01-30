import React from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import Octicon, { Rocket } from '@primer/octicons-react';
import {
  SimplePage,
  Category,
  DivSpacer,
  GameCardBox,
  TinySpacer,
} from '../common/Style';
import { useDispatch } from '../components/hooks/useAppContext';
import { startGame } from '../common/Actions';

const StartButtonRow = styled.div`
  margin: 3rem 2rem 2rem;
  text-align: center;
`;

const Main = () => {
  const dispatch = useDispatch();

  return (
    <SimplePage>
      <Category data-testid="categoryTitle">
        Welcome to the Trivia Challenge
      </Category>
      <GameCardBox>
        <div>You will be presented with 10 True and False questions.</div>
        <DivSpacer />
        <div>Can you score 100%?</div>
      </GameCardBox>
      <StartButtonRow>
        <Button
          id="startButton"
          size="large"
          type="primary"
          onClick={() => {
            startGame(dispatch);
          }}
        >
          Start Game{' '}
          <TinySpacer>
            <Octicon size="small" icon={Rocket} />
          </TinySpacer>
        </Button>
      </StartButtonRow>
    </SimplePage>
  );
};

export default Main;
