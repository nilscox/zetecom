import { ScienceEtVie } from '../scienceetvie';

describe('scienceetvie', () => {
  it('url 1', () => {
    const scienceetvie = new ScienceEtVie();
    const url =
      'https://www.science-et-vie.com/corps-et-sante/covid-19-les-repas-responsables-de-presque-la-moitie-des-cas-dans-le-milieu-fami-60663';
    const identifier = scienceetvie.getIdentifier(url);

    expect(identifier).toEqual('scienceetvie:60663');
  });
});
