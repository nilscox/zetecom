import { AppState } from '@zetecom/app-core';
import { useSelector } from 'react-redux';

export const useAppSelector = <Args extends unknown[], Result>(
  selector: (state: AppState, ...args: Args) => Result,
  ...args: Args
) => {
  return useSelector((state: AppState) => selector(state, ...args));
};
