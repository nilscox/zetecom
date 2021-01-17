import { IFrame } from 'testea';

const EMAIL_BASE_URL = 'http://localhost:1080';

let iframe: IFrame;

beforeEach(function () {
  iframe = this.iframe;
});

export const flushEmails = async () => {
  await fetch(EMAIL_BASE_URL + '/email/all', { method: 'DELETE' });
};

export const getEmails = async () => {
  const response = await fetch(EMAIL_BASE_URL + '/email');

  return response.json();
};

export const viewEmail = (id: string) => {
  return iframe.navigate(EMAIL_BASE_URL + '/email/' + id + '/html');
};
