import { Liberation } from '../liberation';

describe('liberation', () => {
  it('url 1', () => {
    const liberation = new Liberation();
    const url = 'https://www.liberation.fr/france/2020/11/21/loi-securite-globale-venir-ici-avec-la-peur-au-ventre-c-est-triste-pour-la-democratie_1806336';
    const identifier = liberation.getIdentifier(url);

    expect(identifier).toEqual('liberation:france:2020-11-21:1806336');
  });
});
