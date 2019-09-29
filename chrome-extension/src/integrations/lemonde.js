const BASE_URL = process.env.BASE_URL;

window.addEventListener('message', (evt) => {
  const { data } = evt;

  if (data.type === 'INTEGRATION_LOADED')
    chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE', url: window.location.url });
});

function render(articleContent) {
  const iframe = document.createElement('iframe');

  iframe.id = 'cdv-iframe';
  iframe.src = `${BASE_URL}/integration?url=${window.location.href}`;
  iframe.scrolling = 'no';
  iframe.frameBorder = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.display = 'block';
  iframe.style.margin = '10px 0';

  articleContent.insertAdjacentElement('afterend', iframe);

  iFrameResize({ log: false, checkOrigin: false }, iframe);
}

function main() {
  const articleContent = document.getElementsByClassName('article__content')[0];

  if (!articleContent) {
    // console.warn('[CDV] element "section.article__content" not found');
    return setTimeout(main, 500);
  }

  render(articleContent);
};

main();
