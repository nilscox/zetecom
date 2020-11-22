import { LeMonde } from '../lemonde';

describe('lemonde', () => {
  it('url 1', () => {
    const lemonde = new LeMonde();
    const url = 'https://www.lemonde.fr/pixels/article/2020/04/05/coronavirus-le-risque-est-d-entrer-dans-une-nouvelle-ere-de-surveillance-numerique-invasive_6035640_4408996.html';
    const identifier = lemonde.getIdentifier(url);

    expect(identifier).toEqual('lemonde:pixels:2020-04-05:6035640_4408996');
  });

  it('url 2', () => {
    const lemonde = new LeMonde();
    const url = 'https://www.lemonde.fr/proche-orient/article/2018/10/26/affaire-khashoggi-macron-ne-veut-pas-remettre-en-cause-les-ventes-d-armes-a-riyad_5375254_3218.html';
    const identifier = lemonde.getIdentifier(url);

    expect(identifier).toEqual('lemonde:proche-orient:2018-10-26:5375254_3218');
  });
});
