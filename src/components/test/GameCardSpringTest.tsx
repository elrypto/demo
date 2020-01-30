import React, { useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import { Button } from 'antd';
import { StringifyOptions } from 'querystring';
import { SimplePage } from '../../common/Style';
import { GameCard } from '../ui/gamecard/GameCard';
import { Question } from '../../common/Interfaces';

interface TestQuestion {
  category: string;
  question: string;
}

const vals: Array<TestQuestion> = [
  { category: 'C1', question: 'Q1' },
  { category: 'C2', question: 'Q2' },
  { category: 'C3', question: 'Q3' },
  { category: 'C4', question: 'Q4' },
  { category: 'C5', question: 'Q5' },
];

const Container = styled.div`
  height: 300px;
`;

export default () => {
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
          {isForward
            ? transitions.map(({ item, props, key }) => {
                const val: TestQuestion = vals[item];

                return (
                  <animated.div key={key} style={props}>
                    <GameCard category={val.category} question={val.question} />
                  </animated.div>
                );
              })
            : reverseTransitions.map(({ item, props, key }) => {
                const val: TestQuestion = vals[item];

                return (
                  <animated.div key={key} style={props}>
                    <GameCard category={val.category} question={val.question} />
                  </animated.div>
                );
              })}
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
