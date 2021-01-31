import { diffWordsWithSpace } from 'diff';

const isSame = (a: Diff.Change, b: Diff.Change) => a.added === b.added && a.removed === b.removed;

export const simplify = (line: Diff.Change[]) => {
  return line.reduce((arr, chunk, idx) => {
    const last = arr[idx - 1];

    if (last && isSame(last, chunk)) {
      return [...arr.slice(0, -1), { ...last, value: last.value + chunk.value }];
    }

    return [...arr, chunk];
  }, [] as Diff.Change[]);
};

export const group = (line: Diff.Change[]): Diff.Change[] => {
  let changed = false;

  const result = line.reduce((arr, chunk, idx) => {
    const last = arr[idx - 1];
    const lastLast = arr[idx - 2];

    if (!last || !lastLast) {
      return [...arr, chunk];
    }

    if (last.value.match(/^ +$/) && !last.added && !last.removed && isSame(lastLast, chunk)) {
      changed = true;
      return [...arr.slice(0, -2), { ...chunk, value: lastLast.value + last.value + chunk.value }];
    }

    return [...arr, chunk];
  }, [] as Diff.Change[]);

  if (changed) {
    return group(result);
  }

  return result;
};

type MakeDiffOpts = {
  simplify?: boolean;
  group?: boolean;
};

const makeDiff = (before: string, after: string, opts: MakeDiffOpts = {}) => {
  const chunks = diffWordsWithSpace(before, after);
  const lines: Diff.Change[][][] = [];
  let [leftChunk, rightChunk]: Diff.Change[][] = [[], []];
  let buf = '';

  const flushChunk = (chunk: Diff.Change) => {
    if (!buf) {
      return;
    }

    if (chunk.removed) {
      leftChunk.push({ value: buf, removed: true });
    } else if (chunk.added) {
      rightChunk.push({ value: buf, added: true });
    } else {
      leftChunk.push({ value: buf });
      rightChunk.push({ value: buf });
    }

    buf = '';
  };

  for (const chunk of chunks) {
    for (const chr of chunk.value) {
      if (chr === '\n') {
        flushChunk(chunk);

        if (chunk.added) {
          lines.push([[], rightChunk]);
          rightChunk = [];
        } else if (chunk.removed) {
          lines.push([leftChunk, []]);
          leftChunk = [];
        } else {
          lines.push([leftChunk, rightChunk]);
          leftChunk = [];
          rightChunk = [];
        }

        continue;
      }

      buf += chr;
    }

    flushChunk(chunk);
  }

  lines.push([leftChunk, rightChunk]);

  let result = lines;

  if (opts.simplify) {
    result = result.map(leftAndRight => leftAndRight.map(simplify));
  }

  if (opts.group) {
    result = result.map(leftAndRight => leftAndRight.map(group));
  }

  return result;
};

export default makeDiff;
