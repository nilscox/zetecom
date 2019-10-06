const BASE_URL = process.env.BASE_URL;
const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

window.addEventListener('message', (evt) => {
  const { data } = evt;

  if (data.type === 'INTEGRATION_LOADED')
    chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE', url: window.location.url });
});

function selectComments(selected, other) {
  selected.style['background'] = '#eee';
  selected.style['font-weight'] = 'bold';
  selected.style['cursor'] = 'initial';

  other.style['background'] = 'white';
  other.style['font-weight'] = 'initial';
  other.style['cursor'] = 'pointer';
}

function createButtons() {
  const commonButtonsStyle = {};

  commonButtonsStyle['border'] = '1px solid #ccc';
  commonButtonsStyle['background'] = 'white';
  commonButtonsStyle['color'] = '#222';
  commonButtonsStyle['padding'] = '10px 20px';
  commonButtonsStyle['margin'] = '0';
  commonButtonsStyle['outline'] = 'none';

  const buttonYT = document.createElement('button');
  const buttonCDV = document.createElement('button');

  Object.assign(buttonYT.style, commonButtonsStyle);
  Object.assign(buttonCDV.style, commonButtonsStyle);

  buttonYT.style['border-bottom-left-radius'] = '4px';
  buttonYT.style['border-top-left-radius'] = '4px';
  buttonCDV.style['border-bottom-right-radius'] = '4px';
  buttonCDV.style['border-top-right-radius'] = '4px';

  buttonCDV.style['border-left'] = 'none';

  selectComments(buttonCDV, buttonYT);

  buttonYT.innerText = 'Commentaires YouTube';
  buttonCDV.innerText = 'Commentaires CDV';

  const buttonsGroup = document.createElement('div');

  buttonsGroup.style['text-align'] = 'center';
  buttonsGroup.style['margin-top'] = '10px';
  buttonsGroup.style['margin-bottom'] = '10px';

  buttonsGroup.appendChild(buttonYT);
  buttonsGroup.appendChild(buttonCDV);

  return {
    buttons: buttonsGroup,
    buttonYT,
    buttonCDV,
  };
}

function render(youtubeId, youtubeComments, setButtons, setIntegration) {
  const integration = document.createElement('div');
  const iframe = document.createElement('iframe');
  const { buttons, buttonYT, buttonCDV } = createButtons();

  buttonYT.onclick = () => {
    selectComments(buttonYT, buttonCDV);

    integration.style.display = 'none';
    youtubeComments.style.display = 'block';
  };

  buttonCDV.onclick = () => {
    selectComments(buttonCDV, buttonYT);

    youtubeComments.style.display = 'none';
    integration.style.display = 'block';
  };

  iframe.id = 'cdv-iframe';
  iframe.src = `${BASE_URL}/integration/youtube?youtubeId=${youtubeId}`;
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.display = 'block';

  integration.appendChild(iframe);

  setButtons(buttons);
  setIntegration(integration);

  iFrameResize({ log: false, checkOrigin: false }, iframe);
}

function main() {
  const comments = document.getElementById('comments') || document.getElementById('comment-section-renderer');
  const youtubeId = YOUTUBE_REGEX.exec(window.location.href);

  if (!youtubeId) {
    console.error('youtubeId not found x(');
    return;
  }

  if (!comments)
    return setTimeout(main, 500);

  const buttons = document.createElement('div');
  const integration = document.createElement('div');

  comments.style.display = 'none';

  render(
    youtubeId[1],
    comments,
    buttons => comments.insertAdjacentElement('beforebegin', buttons),
    integration => comments.insertAdjacentElement('afterend', integration),
  );
};

main();
