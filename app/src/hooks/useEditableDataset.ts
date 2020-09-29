import { useCallback, useEffect, useState } from 'react';

import useUpdateEffect from './use-update-effect';

type EditableDataset<T> = [
  T[] | undefined,
  {
    set: (data: T[]) => void;
    prepend: (...items: T[]) => void;
    append: (...items: T[]) => void;
    remove: (item: T) => void;
    replace: (previous: T, next: T) => void;
  },
];

function useEditableDataset<T>(input?: T[], onUpdate?: 'append' | 'prepend'): EditableDataset<T> {
  const [data, setData] = useState(input);

  const prepend = useCallback(
    (...items: T[]) => {
      if (items.length > 0) {
        setData(data => [...items, ...(data || [])]);
      }
    },
    [],
  );

  const append = useCallback(
    (...items: T[]) => {
      if (items.length > 0) {
        setData(data => [...(data || []), ...items]);
      }
    },
    [],
  );

  const remove = useCallback(
    (item: T) => {
      setData((data) => {
        if (!data) {
          return data;
        }

        const idx = data.indexOf(item);

        if (idx !== -1) {
          return [...data.slice(0, idx), ...data.slice(idx + 1)];
        }

        return data;
      });
    },
    [],
  );

  const replace = useCallback(
    (previous: T, next: T) => {
      setData(data => {
        if (!data) {
          return data;
        }

        const idx = data.indexOf(previous);

        if (idx !== -1) {
          return [...data.slice(0, idx - 1), next, ...data.slice(idx + 1)];
        }

        return data;
      });
    },
    [],
  );

  useUpdateEffect(() => {
    if (input) {
      if (onUpdate === 'prepend') {
        prepend(...input);
      } else if (onUpdate === 'append') {
        append(...input);
      }
    }
  }, [input]);

  return [
    data,
    {
      set: setData,
      prepend,
      append,
      remove,
      replace,
    },
  ];
}

export default useEditableDataset;
