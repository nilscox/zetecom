export const classList = (...arr) => {
  const result = [];

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] instanceof Array)
      result.push(classList(...arr[i]));
    else if (typeof arr[i] === 'string')
      result.push(arr[i]);
  }

  return result.join(' ').replace(/  +/g, ' ').trim();
};
