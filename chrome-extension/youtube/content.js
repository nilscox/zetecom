const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

function render(rootTag, youtubeComments, youtubeId) {
  const iframe = document.createElement('iframe');

  iframe.id = 'cdv-iframe';
  iframe.src = 'https://cdv.localhost/?youtubeId=' + youtubeId;
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.display = 'block';

  rootTag.appendChild(iframe);
  iFrameResize({ log: false, checkOrigin: false }, iframe);
}

function main() {
  const comments = document.getElementById('comments');
  const youtubeId = YOUTUBE_REGEX.exec(window.location.href);

  if (!youtubeId) {
    console.error('youtubeId not found x(');
    return;
  }

  if (!comments)
    return setTimeout(main, 500);

  const rootTag = document.createElement('div');
  const parent = comments.parentNode;

  comments.remove();
  parent.appendChild(rootTag);

  render(rootTag, comments, youtubeId[1]);
};

main();
