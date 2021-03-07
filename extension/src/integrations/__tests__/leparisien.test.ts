import { LeParisien } from '../leparisien';

describe('leparisien', () => {
  it('url 1', () => {
    const leparisien = new LeParisien();
    const url =
      'https://www.leparisien.fr/societe/covid-19-seuls-40-des-francais-prets-a-se-faire-vacciner-pire-taux-du-monde-selon-un-sondage-29-12-2020-8416529.php';
    const identifier = leparisien.getIdentifier(url);

    expect(identifier).toEqual('leparisien:2020-12-29:8416529');
  });

  it('url 2', () => {
    const leparisien = new LeParisien();
    const url =
      'https://www.leparisien.fr/societe/sante/boissons-energisantes-une-association-demande-un-meilleur-encadrement-05-03-2021-EXXQYFSJYFDXHO5QOLVRC3ELVM.php';
    const identifier = leparisien.getIdentifier(url);

    expect(identifier).toEqual('leparisien:2021-03-05:EXXQYFSJYFDXHO5QOLVRC3ELVM');
  });
});
