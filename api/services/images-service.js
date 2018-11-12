const getImageFromUrl = url => {
  if (url.match(/lemonde\.fr/))
    return '/assets/images/logo-le-monde.png';

  if (url.match(/lefigaro\.fr/))
    return '/assets/images/logo-le-monde.png';

  if (url.match(/youtube\.(com|fr)/))
    return '/assets/images/logo-youtube.png';

  return null;
};

module.exports = {
  getImageFromUrl,
};
