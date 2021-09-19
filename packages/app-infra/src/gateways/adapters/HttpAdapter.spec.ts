import { expect, mockFn } from 'earljs';

import { FetchHttpAdapter, HttpAdapter } from './HttpAdapter';

describe('HTTPAdapter', () => {
  let adapter: HttpAdapter;

  // @ts-expect-error dirty hack to polyfill the Headers global object
  global.Headers = Map;

  beforeEach(() => {
    adapter = new FetchHttpAdapter('https://api.url');
  });

  const mockFetch = <T>({
    response,
    headers = new Map(),
    status = 200,
  }: Partial<{ response: T; headers: Map<string, string>; status: number }> = {}) => {
    if (response !== undefined && !headers.get('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const mock = mockFn<typeof fetch>().resolvesToOnce({
      status,
      // @ts-expect-error dirty hack to polyfill the Headers global object
      headers: headers as Headers,
      json: () => Promise.resolve(response),
    } as Response);

    global.fetch = mock;

    return mock;
  };

  it('performs a request', async () => {
    const fetch = mockFetch({ response: 42 });

    const [body, response] = await adapter.get('/get/something');

    expect(response.status).toEqual(200);
    expect(body).toEqual(42);

    expect(fetch).toHaveBeenCalledWith([
      'https://api.url/get/something',
      {
        method: expect.a(String),
        credentials: 'include',
        headers: expect.anything(),
        body: undefined,
      },
    ]);
  });

  it('performs a GET request', async () => {
    const fetch = mockFetch();

    await adapter.get('');

    expect(fetch).toHaveBeenCalledWith([
      expect.a(String),
      expect.objectWith({
        method: 'GET',
      }),
    ]);
  });

  it('performs a POST request', async () => {
    const fetch = mockFetch();

    await adapter.post('', { body: { six: 6 } });

    expect(fetch).toHaveBeenCalledWith([
      expect.a(String),
      expect.objectWith({
        method: 'POST',
        headers: new Map([['Content-Type', 'application/json']]),
        body: '{"six":6}',
      }),
    ]);
  });

  it('performs a PUT request', async () => {
    const fetch = mockFetch();

    await adapter.put('');

    expect(fetch).toHaveBeenCalledWith([
      expect.a(String),
      expect.objectWith({
        method: 'PUT',
      }),
    ]);
  });

  it("returns the response's body depending its content-type header", async () => {
    mockFetch({ response: 6, headers: new Map([['Content-Type', 'text/plain']]) });
    expect((await adapter.post(''))[0]).toEqual(undefined);

    mockFetch({ response: 6, headers: new Map([['Content-Type', 'application/json; charset=utf-8']]) });
    expect((await adapter.post(''))[0]).toEqual(6);
  });

  it('performs a request with some query parameters', async () => {
    const fetch = mockFetch();

    await adapter.get('', { query: { param: '42', query: 'string' } });

    expect(fetch).toHaveBeenCalledWith(['https://api.url?param=42&query=string', expect.anything()]);
  });

  it('validates the response status', async () => {
    mockFetch({ status: 200 });
    await expect(adapter.get('')).not.toBeRejected();

    mockFetch({ status: 401 });
    await expect(adapter.get('')).toBeRejected('Request failed with status 401');

    mockFetch({ status: 418 });
    await expect(adapter.get('', { expectedStatus: 418 })).not.toBeRejected();

    mockFetch({ status: 418 });
    await expect(adapter.get('', { expectedStatus: [418, 421] })).not.toBeRejected();

    mockFetch({ status: 418 });
    await expect(adapter.get('', { expectedStatus: [200, 421] })).toBeRejected();
  });
});
