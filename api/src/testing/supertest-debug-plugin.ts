import superagent from 'superagent';
import supertest from 'supertest';

interface Test extends supertest.Test {
  _assertStatus(status: number, res: Response): Error | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _data: any;
  req: {
    _header: string;
  };
  res: {
    statusCode: string;
    statusMessage: string;
    httpVersion: string;
    headers: Record<string, string>;
    text: string;
  };
}

const stringifyRequest = (request: Test) => {
  const { req, res, _data } = request;
  const body = typeof _data === 'object' ? JSON.stringify(_data) : _data;

  const requestStr = [
    ...req._header.split('\r\n').slice(0, -1),
    ...(body ? body.split('\n') : []),
  ].map(line => '> ' + line).join('\r\n');

  const responseStr = [
    [res.statusCode, res.statusMessage, res.httpVersion].join(' '),
    ...Object.entries(res.headers).map(([key, value]) => [key, value].join(': ')),
    '',
    res.text,
  ].map(line => '< ' + line).join('\r\n');

  return [requestStr, responseStr];
};

const plugin = (request: Test): void => {
  const _assertStatus = request._assertStatus.bind(request);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  request._assertStatus = (status: number, res: Response) => {
    const result = _assertStatus(status, res);

    if (result instanceof Error) {
      const [requestStr, responseStr] = stringifyRequest(request);

      return new Error([result.message, requestStr, responseStr].join('\n\n'));
    }

    return result;
  };
};

export const debug = plugin as (request: superagent.SuperAgentRequest) => void;
