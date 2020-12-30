import { LesEchos } from '../lesechos';

describe('lesechos', () => {
  it('url 1', () => {
    const lesechos = new LesEchos();
    const url =
      'https://www.lesechos.fr/politique-societe/societe/recensement-de-plus-en-plus-de-departements-voient-leur-population-baisser-1276990';
    const identifier = lesechos.getIdentifier(url);

    expect(identifier).toEqual('lesechos:1276990');
  });
});
