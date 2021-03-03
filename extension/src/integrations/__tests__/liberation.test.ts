import { Liberation } from '../liberation';

describe('liberation', () => {
  it('url 1', () => {
    const liberation = new Liberation();
    const url =
      'https://www.liberation.fr/france/2020/11/21/loi-securite-globale-venir-ici-avec-la-peur-au-ventre-c-est-triste-pour-la-democratie_1806336';
    const identifier = liberation.getIdentifier(url);

    expect(identifier).toEqual('liberation:france:2020-11-21:1806336');
  });

  it('url 2', () => {
    const liberation = new Liberation();
    const url =
      'https://www.liberation.fr/societe/a-chalon-sur-saone-des-forains-sous-perfusion-reclament-des-reponses-concretes-20210303_JCH6CMACYBGRXAFR7YWBCUZ4IE/';
    const identifier = liberation.getIdentifier(url);

    expect(identifier).toEqual('liberation:societe:2021-03-03:JCH6CMACYBGRXAFR7YWBCUZ4IE');
  });

  it('url 2 with sub topic', () => {
    const liberation = new Liberation();
    const url =
      'https://www.liberation.fr/culture/cinema/golden-globes-et-gueule-de-bois-20210225_IKIUEHFHXFA7RAI74HUOAFS4SI/';
    const identifier = liberation.getIdentifier(url);

    expect(identifier).toEqual('liberation:culture:2021-02-25:IKIUEHFHXFA7RAI74HUOAFS4SI');
  });
});
