import { useCallback, useEffect, useState } from 'react';

type EditableDataset<T> = {
  prepend: (data: T) => void,
  append: (data: T) => void,
  replace: (data: T) => void,
  remove: (data: T) => void,
}

const findById = <T extends { id: number }>(dataset: T[]) => (data: T) => {
  return dataset.find((element: T) => element.id === data.id);
};

const useEditableDataset = <T extends { id: number }>(
  dataset?: T[],
  { find = findById, appendOnUpdate = false } = {},
): [T[], EditableDataset<T>] => {
  const [copy, setCopy] = useState(dataset || []);
  const findElement = useCallback(find(copy), [find, copy]);

  useEffect(() => {
    if (!dataset) {
      return;
    }

    if (appendOnUpdate && copy) {
      setCopy([...copy, ...dataset]);
    } else {
      setCopy(dataset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, appendOnUpdate]);

  const prepend = useCallback((newData: T) => void setCopy([newData, ...copy]), [copy]);
  const append = useCallback((newData: T) => void setCopy([...copy, newData]), [copy]);

  const replace = useCallback(
    (newData: T) => {
      const oldData = findElement(newData);
      const idx = oldData && copy.indexOf(oldData);

      if (idx && idx !== -1) {
        setCopy([...copy.slice(0, idx), newData, ...copy.slice(idx + 1)]);
      }
    },
    [copy, findElement],
  );

  const remove = useCallback(
    (item: T) => {
      const idx = copy.indexOf(item);

      if (idx === -1) {
        return;
      }

      setCopy([...copy.slice(0, idx), ...copy.slice(idx + 1)]);
    },
    [copy],
  );

  return [
    copy,
    {
      prepend,
      append,
      replace,
      remove,
    },
  ];
};

export default useEditableDataset;
