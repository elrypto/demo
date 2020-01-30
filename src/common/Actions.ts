import { toast } from 'react-toastify';
import Axios from 'axios';
import {
  Dispatch,
  Question,
  AppState,
  ActionType,
  GameApiData,
  Game,
  GameConfig
} from './Interfaces';

import { API_URL_FROM_CONFIG, LS_KEY_API_DATA, LS_KEY_CONFIG, LS_KEY_GAME } from './Constants';
import { clearLocalStorage, getLSVal } from '../components/hooks/useSaveGameOnChange';
import { DEFAULT_LOADING_STATES } from './Store';
import { navigate } from '@reach/router';

/* toasts */
export const notify = (msg: string, success?: boolean) => {
  !success ? toast(msg) : toast.success(msg, { autoClose: false });
};

export const notifyError = (msg: string) => {
  toast.error(msg, { autoClose: false });
};

export const notifyWarn = (msg: string) => {
  if (!toast.isActive('nfId')) {
    toast.warn(msg, { toastId: 'nfId' });
  }
};

/* immer anon field dispatch */
export const dispatchField = (
  payload: any,
  fieldName: string,
  dispatch: Dispatch
) => {
  dispatch({
    type: ActionType.SET_FIELD,
    payload,
    fieldName,
  });
};

/* start game by clearing local state */
export const startGame = (dispatch: Dispatch) => {
  clearLocalStorage();

  dispatch({
    type: ActionType.RESET_GAME_STATE,
    payload: 'nothing',
  });

  navigate('/play');
};

/* answer for this question index */
export const answerForIndex = (
  answers: Array<any>,
  index: number,
  answer: any,
  dispatch: Dispatch
) => {
  const updated = [...answers];
  updated[index] = answer;
  dispatch({
    type: ActionType.SET_ANSWERS,
    payload: updated,
  });
};

/* question for this index */
export const questionForIndex = (
  questions: Array<Question>,
  index: number,
  totalQuestionCount: number,
  dispatch: Dispatch
) => {
  if (questions && index >= 0 && index < totalQuestionCount) {
    dispatch({
      type: ActionType.SET_QUESTION_INDEX,
      payload: index,
    });

    dispatch({
      type: ActionType.SET_CURRENT_QUESTION,
      payload: questions[index],
    });
  } else {
    console.warn('attempt to set index out of bounds for questions:', index);
  }
};


/* recover and then refreshgamestate */
export const recoverAndRefreshGameState = (dispatch: Dispatch) => {
  const api: GameApiData = getLSVal(LS_KEY_API_DATA)
  const config: GameConfig = getLSVal(LS_KEY_CONFIG);
  const game: Game = getLSVal(LS_KEY_GAME);

  refreshGameFromState(
    {
      game: game,
      apiData: api,
      gameConfig: config,
      loadingStates: DEFAULT_LOADING_STATES
    }
    , dispatch);

  questionForIndex(api.questions!, game.questionIndex, config.amount, dispatch);
}

/* set all state to payload */
export const refreshGameFromState = (
  allState: AppState,
  dispatch: Dispatch
) => {
  dispatch({
    type: ActionType.SET_ALL_STATE,
    payload: allState,
  });
};


/* states for UI - loading, error or fully loaded */
export const loading = (val: boolean, dispatch: Dispatch) => {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: val,
  });
};

export const error = (err: Error, dispatch: Dispatch) => {
  dispatch({
    type: ActionType.SET_ERROR,
    payload: err,
  });
};

export const loaded = (val: boolean, dispatch: Dispatch) => {
  dispatch({
    type: ActionType.SET_LOADED,
    payload: val,
  });
};

/* build the url for fetching, can be extended to game types and difficulty levels */
export const buildUrl = (gameConfig: GameConfig): string => {
  const { amount, difficulty, gameType } = gameConfig;
  return `${API_URL_FROM_CONFIG}?amount=${amount}&difficulty=${difficulty}&type=${gameType}`;
};


/* fetch game from REST api */
export const fetchGame = async (gameConfig: GameConfig, dispatch: Dispatch) => {
  const url = buildUrl(gameConfig);

  loading(true, dispatch);

  try {
    const fetched = await Axios.get(url);

    dispatch({
      type: ActionType.SET_API_QUESTIONS,
      payload: fetched.data.results,
    });

    loaded(true, dispatch);
    loading(false, dispatch);
  } catch (error) {
    notifyError(
      `Error occured while fetching the game, check your connection to the internet${error.message}`
    );
    console.error('error while connecting to url:', url);
    console.error(error);
    error(error, dispatch);
  }
};
