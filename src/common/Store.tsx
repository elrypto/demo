import React from 'react';
import { useImmerReducer } from 'use-immer';
import {
  Action,
  AppState,
  Dispatch,
  GameApiData,
  ActionType,
  DifficultyLevel,
  GameType,
  Question,
} from './Interfaces';

export const DEFAULT_LOADING_STATES = {
  error: null,
  loading: false,
  loaded: false,
}

/*
  inital state, as defined in AppState interface
*/
const initialState: AppState = {
  game: {
    questionIndex: 0,
    currentQuestion: {} as Question,
    answers: [],
  },
  gameConfig: {
    difficulty: DifficultyLevel.HARD,
    amount: 10,
    gameType: GameType.BOOLEAN,
  },
  apiData: {} as GameApiData,
  loadingStates: DEFAULT_LOADING_STATES
  ,
};

/*
  immer reducer
*/
function appReducer(draft: AppState, action: Action | any) {
  switch (action.type) {
    case ActionType.SET_FIELD: {
      draft[action.fieldName] = action.payload;
      return;
    }
    case ActionType.SET_API_QUESTIONS: {
      draft.apiData.questions = action.payload;
      return;
    }
    case ActionType.SET_QUESTION_INDEX: {
      draft.game.questionIndex = action.payload;
      return;
    }
    case ActionType.SET_CURRENT_QUESTION: {
      draft.game.currentQuestion = action.payload;
      return;
    }
    case ActionType.SET_ALL_STATE: {
      draft = action.payload;
      return;
    }
    case ActionType.SET_LOADING: {
      draft = action.payload;
      return;
    }
    case ActionType.SET_ERROR: {
      draft = action.payload;
      return;
    }
    case ActionType.SET_LOADED: {
      draft = action.payload;
      return;
    }
    case ActionType.SET_ANSWERS: {
      draft.game.answers = action.payload;
      return;
    }
    case ActionType.RESET_GAME_STATE: {
      draft = initialState;
      return;
    }
    default:
      console.error(
        'default reducer met, likely an error on action.type called (not there)'
      );
  }
}

/*
  Provides option to use state and or dispatch

  Best used with /components/hooks/ useAppContext() 
*/
export const StateContext = React.createContext<AppState>(initialState);
export const DispatchContext = React.createContext<Dispatch>({} as Dispatch);

/*
  Using immer currying reducer react hook

  usage in app is <AppContext...>

  see immer documentation here:
*/
export function AppContextProvider(props: any): JSX.Element {
  const [state, dispatch] = useImmerReducer(appReducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
