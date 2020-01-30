import React from 'react';
import useAppContext from '../components/hooks/useAppContext';
import { SimplePage } from '../common/Style';
import { Question } from '../common/Interfaces';
import useSaveGameOnChange from '../components/hooks/useSaveGameOnChange';
import { GameCard } from '../components/ui/gamecard/GameCard';
import useGameData from '../components/hooks/useGameData';
import ControlsAndStatusBox from '../components/ui/gamecard/ControlsAndStatusBox';
import GameCardLoading from '../components/ui/gamecard/GameCardLoading';

const Basic = () => {
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

  if (error) return <SimplePage>Error occured:{error}</SimplePage>;

  if (questions) {
    return (
      <SimplePage>
        <GameCard {...currentQuestion} />

        <ControlsAndStatusBox
          questions={questions}
          answers={answers}
          questionIndex={questionIndex}
          gameConfig={gameConfig}
          dispatch={dispatch}
        />
      </SimplePage>
    );
  }

  /* Default, Loading state */
  return (
    <SimplePage>
      <GameCardLoading />
    </SimplePage>
  );
};

export default Basic;
