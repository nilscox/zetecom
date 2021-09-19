type QueryString = Record<string, string | number>;

type FetchOptions<RequestBody = unknown> = Partial<{
  query: QueryString;
  body: RequestBody;
  expectedStatus: number | number[];
}>;

export class RequestError extends Error {
  constructor(readonly response: Response) {
    super(`Request failed with status ${response.status}`);
  }
}

export interface HttpAdapter {
  get<ResponseBody>(url: string, options?: FetchOptions): Promise<[ResponseBody, Response]>;

  post<ResponseBody, RequestBody = unknown>(
    url: string,
    options?: FetchOptions<RequestBody>,
  ): Promise<[ResponseBody, Response]>;

  put<ResponseBody, RequestBody = unknown>(
    url: string,
    options?: FetchOptions<RequestBody>,
  ): Promise<[ResponseBody, Response]>;
}

export class FetchHttpAdapter implements HttpAdapter {
  constructor(private readonly apiUrl: string) {}

  async get<ResponseBody>(url: string, options: FetchOptions = {}) {
    return this.request<ResponseBody>('GET', url, options);
  }

  async post<ResponseBody, RequestBody = unknown>(
    url: string,
    options: FetchOptions<RequestBody> = {},
  ): Promise<[ResponseBody, Response]> {
    return this.request<ResponseBody>('POST', url, options);
  }

  async put<ResponseBody, RequestBody = unknown>(
    url: string,
    options: FetchOptions<RequestBody> = {},
  ): Promise<[ResponseBody, Response]> {
    return this.request<ResponseBody>('PUT', url, options);
  }

  private async request<ResponseBody>(
    method: string,
    url: string,
    options: FetchOptions,
  ): Promise<[ResponseBody, Response]> {
    const { expectedStatus = 200, query, body } = options;

    const headers = new Headers();

    if (body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(this.buildUrl(url, query), {
      method,
      credentials: 'include',
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    this.validateStatus(expectedStatus, response);

    return [await this.getBody(response), response];
  }

  private static queryString(query: QueryString = {}): string {
    return Object.entries(query)
      .map((kv) => kv.join('='))
      .join('&');
  }

  private buildUrl(endpoint: string, query?: QueryString) {
    const queryString = FetchHttpAdapter.queryString(query);
    let url = this.apiUrl + endpoint;

    if (queryString) {
      url += '?' + queryString;
    }

    return url;
  }

  private validateStatus(expectedStatus: number | number[], response: Response): void {
    if (typeof expectedStatus === 'number') {
      return this.validateStatus([expectedStatus], response);
    }

    if (!expectedStatus.some((status) => status === response.status)) {
      throw new RequestError(response);
    }
  }

  private getBody(response: Response) {
    if (response.headers.get('Content-Type')?.startsWith('application/json')) {
      return response.json();
    }
  }
}
