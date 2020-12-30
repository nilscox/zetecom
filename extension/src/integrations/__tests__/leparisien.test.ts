import { LeParisien } from '../leparisien';

describe('leparisien', () => {
  it('url 1', () => {
    const leparisien = new LeParisien();
    const url =
      'https://www.leparisien.fr/societe/covid-19-seuls-40-des-francais-prets-a-se-faire-vacciner-pire-taux-du-monde-selon-un-sondage-29-12-2020-8416529.php';
    const identifier = leparisien.getIdentifier(url);

    expect(identifier).toEqual('leparisien:8416529');
  });
});
