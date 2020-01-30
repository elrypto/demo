import React from 'react';
import { StateContext, DispatchContext } from '../../common/Store';

const useAppContext = () => {
  const state = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  return { state, dispatch };
};

export const useContextState = () => React.useContext(StateContext);

export const useDispatch = () => React.useContext(DispatchContext);

export default useAppContext;
