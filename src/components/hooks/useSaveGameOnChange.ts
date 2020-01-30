import { useEffect } from 'react';
import { GameApiData, Dispatch } from '../../common/Interfaces';
import { useContextState } from './useAppContext';
import {
  LS_KEY_API_DATA,
  LS_KEY_CONFIG,
  LS_KEY_GAME,
} from '../../common/Constants';
import { recoverAndRefreshGameState } from '../../common/Actions';

/* add a value to local storage */
export const addToLS = (key: string, obj: any) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

/* 
  get value from local storage
  returns empty object for nul values
*/
export const getLSVal = (key: string) => {
  const retVal = localStorage.getItem(key);
  if (retVal) {
    return JSON.parse(retVal);
  }
  return {};
}

/*
  If any game state  we are watching changes, save it locally so the user
  can resume their game if they close/leave browser window

  expect api and config to rarely change, and game data to change
  frequently (thus, seperated into 3 useEffect hooks
*/
const useSaveGameOnChange = () => {
  const state = useContextState();

  useEffect(() => {
    addToLS(LS_KEY_API_DATA, state.apiData);
  }, [state.apiData]);

  useEffect(() => {
    addToLS(LS_KEY_CONFIG, state.gameConfig);
  }, [state.gameConfig]);

  useEffect(() => {
    addToLS(LS_KEY_GAME, state.game);
  }, [state.game]);
};

/* clears all local storage values */
export const clearLocalStorage = () => {
  addToLS(LS_KEY_API_DATA, {});
  addToLS(LS_KEY_CONFIG, {});
  addToLS(LS_KEY_GAME, {});
};

export const checkForLocalState = () => {
  let found = false;

  const api: GameApiData = getLSVal(LS_KEY_API_DATA)
  const config = getLSVal(LS_KEY_CONFIG);
  const game = getLSVal(LS_KEY_GAME);

  if (api && config && game && api.questions && (api.questions.length > 0)) {
    found = true;
  }
  return found;
}

//TODO: action call and dispatch should not have leaked here, and should go 
// fully generic, and remove all explicit types and keys above
export const useRecoverIfLocalState = (dispatch: Dispatch) => {
  useEffect(() => {
    if (checkForLocalState()) {
      recoverAndRefreshGameState(dispatch);
    }
  }, [])
}


export default useSaveGameOnChange;
