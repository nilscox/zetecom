import { Reducer, useReducer } from 'react';

import useUpdateEffect from './useUpdateEffect';

type EditableDataset<T> = [
  T[] | undefined,
  {
    set: (data: T[]) => void;
    prepend: (...items: T[]) => void;
    append: (...items: T[]) => void;
    remove: (item: T) => void;
    replace: (prev: T, next: T) => void;
  },
];

type Set<T> = {
  type: 'set';
  items: T[];
};

type Prepend<T> = {
  type: 'prepend';
  items: T[];
};

type Append<T> = {
  type: 'append';
  items: T[];
};

type Remove<T> = {
  type: 'remove';
  items: T[];
};

type Replace<T> = {
  type: 'replace';
  prev: T;
  next: T;
};

type Action<T> = Set<T> | Prepend<T> | Append<T> | Remove<T> | Replace<T>;

const reducer = <T>(data: T[] | undefined, action: Action<T>) => {
  switch (action.type) {
    case 'set':
      return [...action.items];

    case 'prepend':
      return [...action.items, ...(data || [])];

    case 'append':
      return [...(data || []), ...action.items];

    case 'remove': {
      if (!data) {
        return;
      }

      return data.filter(item => !action.items.includes(item));
    }

    case 'replace': {
      if (!data) {
        return;
      }

      const idx = data.indexOf(action.prev);

      if (idx !== -1) {
        return [...data.slice(0, idx), action.next, ...data.slice(idx + 1)];
      }

      return data;
    }
  }
};

const useEditableDataset = <T>(input?: T[], onUpdate?: 'set' | 'append' | 'prepend'): EditableDataset<T> => {
  const [data, dispatch] = useReducer<Reducer<T[], Action<T>>>(reducer, input);

  useUpdateEffect(() => {
    if (input && onUpdate) {
      dispatch({ type: onUpdate, items: input });
    }
  }, [input]);

  return [
    data,
    {
      set: (items: T[]) => dispatch({ type: 'set', items }),
      prepend: (...items: T[]) => dispatch({ type: 'prepend', items }),
      append: (...items: T[]) => dispatch({ type: 'append', items }),
      remove: (...items: T[]) => dispatch({ type: 'remove', items }),
      replace: (prev: T, next: T) => dispatch({ type: 'replace', prev, next }),
    },
  ];
};

export default useEditableDataset;
