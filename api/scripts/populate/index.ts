import 'reflect-metadata';

import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { main } from './main';
import { Dataset } from './dtos/Dataset';

const readInputFromStdin = (): any => {
  const stdin = process.stdin;

  stdin.resume();
  stdin.setEncoding('utf8');

  return new Promise((ok, ko) => {
    const data: any[] = [];

    stdin.on('data', data.push.bind(data));

    stdin.on('end', () => {
      const input = data.join();

      try { ok(JSON.parse(input)); }
      catch { ko('Cannot parse json\n' + input); }
    });
  });
};

(async () => {
  try {
    const input = await readInputFromStdin();
    const dataset = plainToClass(Dataset, input);

    await validateOrReject(dataset);
    await main(dataset);
  } catch (e) {
    const { response } = e;

    if (response) {
      console.error('Error:', e.message);
      console.error(response.data);
    } else if (e.code === 'ECONNREFUSED') {
      console.error('Error:', e.message);
    } else if (Array.isArray(e) && e && e[0].constructor.name === 'ValidationError') {
      console.error(JSON.stringify(e, null, 2));
    } else {
      console.error(e);
    }

    process.exitCode = 1;
  }
})();
