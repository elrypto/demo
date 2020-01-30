import { useEffect } from 'react';
import { fetchGame, questionForIndex } from '../../common/Actions';
import { AppState, Dispatch, GameConfig } from '../../common/Interfaces';

/* fetch if no api data in state
  */
export default (
  gameConfig: GameConfig,
  state: AppState,
  dispatch: Dispatch
) => {
  /* fetch api if we dont have any
   */
  useEffect(() => {
    const fetchQuestions = async () => {
      await fetchGame(gameConfig, dispatch);
    };
    if (!state.apiData.questions) {
      // console.log('no questions, fetching');
      fetchQuestions();
    }
  }, [state.apiData, gameConfig, dispatch]);

  const { questions } = state.apiData;
  const { questionIndex } = state.game;

  /* pulls in the question for this index */
  useEffect(() => {
    if (questions && questions.length > 0) {
      questionForIndex(questions, questionIndex, gameConfig.amount, dispatch);
    }
  }, [questions, questionIndex, gameConfig.amount, dispatch]);
};
