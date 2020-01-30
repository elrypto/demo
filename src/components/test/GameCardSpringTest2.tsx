import React, { useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { Button } from 'antd';
import { SimplePage } from '../../common/Style';
import { GameCard } from '../ui/gamecard/GameCard';
import { Question } from '../../common/Interfaces';
import useSaveGameOnChange from '../hooks/useSaveGameOnChange';
import useGameData from '../hooks/useGameData';
import useAppContext from '../hooks/useAppContext';

interface TestQuestion {
  category: string;
  question: string;
}

const Container = styled.div`
  height: 300px;
`;

export default () => {
  const { state, dispatch } = useAppContext();
  const { error } = state.loadingStates;
  const questions: Array<Question> | undefined | null =
    state.apiData?.questions;
  const { currentQuestion, questionIndex, answers } = state.game;
  const { gameConfig } = state;

  /* save to localstorage on any change in state */
  useSaveGameOnChange();

  /* fetches data from api, and sets the data for current game index */
  useGameData(gameConfig, state, dispatch);

  const [index, setIndex] = useState(0);
  const [isForward, setIsForward] = useState(false);
  const forwardClick = () => {
    setIndex(index + 1);
    setIsForward(true);
  };
  const backwardClick = () => {
    setIndex(index - 1);
    setIsForward(false);
  };
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const reverseTransitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  });

  return (
    <SimplePage>
      <Container>
        <div className="simple-trans-main">
          {questions
            ? isForward
              ? transitions.map(({ item, props, key }) => {
                  const val: Question = questions[item];
                  return (
                    <animated.div key={key} style={props}>
                      <GameCard
                        category={val.category}
                        question={val.question}
                      />
                    </animated.div>
                  );
                })
              : reverseTransitions.map(({ item, props, key }) => {
                  const val: Question = questions[item];
                  return (
                    <animated.div key={key} style={props}>
                      <GameCard
                        category={val.category}
                        question={val.question}
                      />
                    </animated.div>
                  );
                })
            : 'Loading...'}
        </div>
      </Container>
      <div>
        <Button onClick={backwardClick}>p</Button>
        <Button onClick={forwardClick}>n</Button>

        <Button
          onClick={() => {
            setIndex(4);
            setIsForward(true);
          }}
        >
          specific
        </Button>
      </div>
    </SimplePage>
  );
};
