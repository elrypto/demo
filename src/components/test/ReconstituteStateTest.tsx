import React from 'react';
import { Button } from 'antd';
import {
  LS_KEY_API_DATA,
  LS_KEY_CONFIG,
  LS_KEY_GAME,
} from '../../common/Constants';
import { AppState, LoadingStates } from '../../common/Interfaces';
import { refreshGameFromState } from '../../common/Actions';
import { useDispatch } from '../hooks/useAppContext';

export const ReconstituteStateFromLocal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        type="dashed"
        onClick={() => {
          console.log('attempting to rebuild from last state change');

          const api = localStorage.getItem(LS_KEY_API_DATA);
          const config = localStorage.getItem(LS_KEY_CONFIG);
          const game = localStorage.getItem(LS_KEY_GAME);

          if (api && config && game) {
            const allState: AppState = {
              game: JSON.parse(game),
              apiData: JSON.parse(api),
              gameConfig: JSON.parse(config),
              loadingStates: {} as LoadingStates,
            };

            refreshGameFromState(allState, dispatch);
          } else {
            console.warn('attempting to rebuild invalid or missing state');
          }
        }}
      />
    </>
  );
};
