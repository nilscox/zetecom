const EXTENSION_URL = process.env.EXTENSION_URL;

window.addEventListener('message', (evt) => {
  const { data } = evt;

  if (data.type === 'INTEGRATION_LOADED')
    chrome.runtime.sendMessage({ type: 'SET_EXTENSION_ACTIVE', url: window.location.url });
});

function selectComments(selected, other) {
  selected.style['background'] = '#f1680d';
  selected.style['font-weight'] = 'bold';
  selected.style['cursor'] = 'initial';

  other.style['background'] = '#404040';
  other.style['color'] = '#fff';
  other.style['font-weight'] = 'initial';
  other.style['cursor'] = 'pointer';
}

function createButtons() {
  const commonButtonsStyle = {};

  commonButtonsStyle['border'] = 'none';
  commonButtonsStyle['background'] = '#404040';
  commonButtonsStyle['color'] = '#fff';
  commonButtonsStyle['padding'] = '5px 10px';
  commonButtonsStyle['margin'] = '0';
  commonButtonsStyle['outline'] = 'none';

  const buttonSK = document.createElement('button');
  const buttonRI = document.createElement('button');

  Object.assign(buttonSK.style, commonButtonsStyle);
  Object.assign(buttonRI.style, commonButtonsStyle);

  buttonSK.style['border-bottom-left-radius'] = '4px';
  buttonSK.style['border-top-left-radius'] = '4px';
  buttonRI.style['border-bottom-right-radius'] = '4px';
  buttonRI.style['border-top-right-radius'] = '4px';

  buttonRI.style['border-left'] = 'none';

  selectComments(buttonRI, buttonSK);

  buttonSK.innerText = 'Commentaires Skepitkón';
  buttonRI.innerText = 'Commentaires Réagir à l\'information';

  const buttonsGroup = document.createElement('div');

  buttonsGroup.style['text-align'] = 'center';
  buttonsGroup.style['margin-top'] = '30px';

  buttonsGroup.appendChild(buttonSK);
  buttonsGroup.appendChild(buttonRI);

  return {
    buttons: buttonsGroup,
    buttonSK,
    buttonRI,
  };
}

function render(skeptikonComments, setButtons, setIntegration) {
  const integration = document.createElement('div');
  const iframe = document.createElement('iframe');
  const { buttons, buttonSK, buttonRI } = createButtons();

  buttonSK.onclick = () => {
    selectComments(buttonSK, buttonRI);

    integration.style.display = 'none';
    skeptikonComments.style.display = 'block';
  };

  buttonRI.onclick = () => {
    selectComments(buttonRI, buttonSK);

    skeptikonComments.style.display = 'none';
    integration.style.display = 'block';
  };

  iframe.id = 'ri-iframe';
  iframe.src = `${EXTENSION_URL}/integration?url=${window.location.href}`;
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.border = 'none';
  iframe.style.display = 'block';

  integration.appendChild(iframe);

  setButtons(buttons);
  setIntegration(integration);

  iFrameResize({ log: false, checkOrigin: false }, iframe);
}

function main() {
  const comments = document.querySelector('my-video-comments');

  if (!comments)
    return setTimeout(main, 500);

  const buttons = document.createElement('div');
  const integration = document.createElement('div');

  comments.style.display = 'none';

  render(
    comments,
    buttons => comments.insertAdjacentElement('beforebegin', buttons),
    integration => comments.insertAdjacentElement('afterend', integration),
  );
};

main();
