const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

const getYoutubeId = url => {
  const match = YOUTUBE_REGEX.exec(url);

  if (!match)
    return null;

  return match[1];
}

module.exports = {
  getYoutubeId,
};
