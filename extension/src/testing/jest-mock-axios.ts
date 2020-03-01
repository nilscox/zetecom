import mockAxios from 'jest-mock-axios';

import { act, wait } from '@testing-library/react';

export const mockAxiosResponse = async (...args: Parameters<typeof mockAxios.mockResponse>) => {
  await act(async () => {
    mockAxios.mockResponse(...args);
    await wait();
  });
};

export const mockAxiosResponseFor = async (...args: Parameters<typeof mockAxios.mockResponseFor>) => {
  await act(async () => {
    mockAxios.mockResponseFor(...args);
    await wait();
  });
};

export const mockAxiosError = async (...args: Parameters<typeof mockAxios.mockError>) => {
  await act(async () => {
    mockAxios.mockError(...args);
    await wait();
  });
};

export default mockAxios;
