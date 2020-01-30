import React from 'react';
import ControlBox from './ControlBox';
import StatusBox from './StatusBox';
import { Question, GameConfig, Dispatch } from '../../../common/Interfaces';
import { questionForIndex, answerForIndex } from '../../../common/Actions';

interface ControlStatusBoxProps {
  questions: Array<Question>;
  questionIndex: number;
  gameConfig: GameConfig;
  dispatch: Dispatch;
  answers: Array<any>;
}

const ControlsAndStatusBox: React.FC<ControlStatusBoxProps> = ({
  questions,
  answers,
  questionIndex,
  gameConfig,
  dispatch,
}: ControlStatusBoxProps) => {
  return (
    <>
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
        }}
        prevAction={() => {
          questionForIndex(
            questions,
            questionIndex - 1,
            gameConfig.amount,
            dispatch
          );
        }}
        trueAction={() => {
          answerForIndex(answers, questionIndex, true, dispatch);
          questionForIndex(
            questions,
            questionIndex + 1,
            gameConfig.amount,
            dispatch
          );
        }}
        falseAction={() => {
          answerForIndex(answers, questionIndex, false, dispatch);
          questionForIndex(
            questions,
            questionIndex + 1,
            gameConfig.amount,
            dispatch
          );
        }}
      />

      <StatusBox
        questionIndex={questionIndex}
        numberOfQuestions={gameConfig.amount}
        currentAnswer={answers[questionIndex]}
        difficulty={gameConfig.difficulty}
      />
    </>
  );
};

export default ControlsAndStatusBox;
