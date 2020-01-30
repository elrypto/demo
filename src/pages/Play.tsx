import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import useAppContext from '../components/hooks/useAppContext';
import { SimplePage } from '../common/Style';
import { Question } from '../common/Interfaces';
import useSaveGameOnChange, { useRecoverIfLocalState } from '../components/hooks/useSaveGameOnChange';
import useGameData from '../components/hooks/useGameData';
import GameCardLoading from '../components/ui/gamecard/GameCardLoading';
import { GameCard } from '../components/ui/gamecard/GameCard';
import { answerForIndex, questionForIndex } from '../common/Actions';
import { ControlBox } from '../components/ui/gamecard/ControlBox';
import { StatusBox } from '../components/ui/gamecard/StatusBox';

const QuestionContainer = styled.div`
  height: 300px;
  text-align: center;
`;

const Play = () => {
  const { state, dispatch } = useAppContext();
  const [backwards, setBackwards] = useState<boolean>(false);
  const { error } = state.loadingStates;
  const { gameConfig } = state;
  const { questionIndex, answers } = state.game;
  const questions: Array<Question> | undefined | null =
    state.apiData?.questions;

  /* on the first load, give a check to localstorage for state */
  //const haveLocalState = checkForLocalState();

  useRecoverIfLocalState(dispatch);


  /* fetches data from api, and sets the data for current game index */
  useGameData(gameConfig, state, dispatch);

  /* save to localstorage on any change in state */
  useSaveGameOnChange();

  /* definitions for react-spring transitions */


  const transitions = useTransition(questionIndex, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const reverseTransitions = useTransition(questionIndex, p => p, {
    from: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  });

  if (error) return <SimplePage>Error occured:{error}</SimplePage>;

  if (questions) {
    return (
      <SimplePage>
        <QuestionContainer>
          <div className="simple-trans-main">
            {backwards
              ? reverseTransitions.map(({ item, props, key }) => {
                const q: Question = questions[item];
                return (
                  <animated.div key={key} style={props}>
                    <GameCard category={q.category} question={q.question} />
                  </animated.div>
                );
              })
              : transitions.map(({ item, props, key }) => {
                const q: Question = questions[item];
                return (
                  <animated.div key={key} style={props}>
                    <GameCard category={q.category} question={q.question} />
                  </animated.div>
                );
              })}
          </div>
        </QuestionContainer>

        <ControlBox
          currentIndex={questionIndex}
          totalItems={gameConfig.amount}
          nextAction={() => {
            questionForIndex(
              questions,
              questionIndex + 1,
              gameConfig.amount,
              dispatch
            );
            setBackwards(false);
          }}
          prevAction={() => {
            questionForIndex(
              questions,
              questionIndex - 1,
              gameConfig.amount,
              dispatch
            );
            setBackwards(true);
          }}
          trueAction={() => {
            answerForIndex(answers, questionIndex, true, dispatch);
            questionForIndex(
              questions,
              questionIndex + 1,
              gameConfig.amount,
              dispatch
            );
            setBackwards(false);
          }}
          falseAction={() => {
            answerForIndex(answers, questionIndex, false, dispatch);
            questionForIndex(
              questions,
              questionIndex + 1,
              gameConfig.amount,
              dispatch
            );
            setBackwards(false);
          }}
        />

        <StatusBox
          questionIndex={questionIndex}
          numberOfQuestions={gameConfig.amount}
          currentAnswer={answers[questionIndex]}
          difficulty={gameConfig.difficulty}
        />
      </SimplePage>
    );
  }

  return (
    <SimplePage>
      <GameCardLoading />
    </SimplePage>
  );
};

export default Play;

