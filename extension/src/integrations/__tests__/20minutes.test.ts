import { Minutes20 } from '../20minutes';

describe('20minutes', () => {
  it('url 1', () => {
    const minutes20 = new Minutes20();
    const url =
      'https://www.20minutes.fr/planete/2937895-20201225-climat-crise-laquelle-doit-faire-face-generation-existentielle-explique-activiste-camille-etienne';
    const identifier = minutes20.getIdentifier(url);

    expect(identifier).toEqual('20minutes:2937895-20201225');
  });

  it('url 2', () => {
    const minutes20 = new Minutes20();
    const url = 'https://www.20minutes.fr/arts-stars/mode/2941439-20201229-pierre-cardin-couturier-francais-mort';
    const identifier = minutes20.getIdentifier(url);

    expect(identifier).toEqual('20minutes:2941439-20201229');
  });
});
