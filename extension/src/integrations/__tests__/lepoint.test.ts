import { LePoint } from '../lepoint';

describe('lepoint', () => {
  it('url 1', () => {
    const lemonde = new LePoint();
    const url =
      'https://www.lepoint.fr/sante/covid-19-une-femme-de-78-ans-premiere-francaise-vaccinee-27-12-2020-2407207_40.php';
    const identifier = lemonde.getIdentifier(url);

    expect(identifier).toEqual('lepoint:sante:2020-12-27:2407207_40');
  });
});
