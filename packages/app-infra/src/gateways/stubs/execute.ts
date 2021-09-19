type ExecuteOptions<R> = {
  log?: unknown[];
  return?: R;
  wait?: number;
  then?: () => R | Promise<R>;
};

export async function execute<R = void>({ log, return: returns, then, wait = 800 }: ExecuteOptions<R> = {}) {
  if (log) {
    // eslint-disable-next-line no-console
    console.log(...log);
  }

  if (wait) {
    await new Promise((r) => setTimeout(r, wait));
  }

  if (then) {
    return then();
  }

  return returns as R;
}
