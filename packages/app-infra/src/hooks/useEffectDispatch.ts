import { DependencyList, useEffect } from 'react';

import { ThunkAction } from '@zetecom/app-core/store/types';
import { useDispatch } from 'react-redux';

export const useEffectDispatch = (thunk: ThunkAction<unknown>, deps: DependencyList) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunk);
  }, deps);
};
