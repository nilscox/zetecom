import { FranceSoir } from '../francesoir';

describe('francesoir', () => {
  it('url 1', () => {
    const lemonde = new FranceSoir();
    const url = 'https://www.francesoir.fr/societe-sante/vaccination-et-gouvernants-alors-ca-vient-la-reine-ou-quoi';
    const identifier = lemonde.getIdentifier(url);

    expect(identifier).toEqual(
      'francesoir:societe-sante:dmFjY2luYXRpb24tZXQtZ291dmVybmFudHMtYWxvcnMtY2EtdmllbnQtbGEtcmVpbmUtb3UtcXVvaQ==',
    );
  });
});
