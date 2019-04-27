const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

function selectComments(selected, other) {
  selected.style['background'] = '#eee';
  selected.style['font-weight'] = 'bold';
  selected.style['cursor'] = 'initial';

  other.style['background'] = 'transparent';
  other.style['font-weight'] = 'initial';
  other.style['cursor'] = 'pointer';
}

function createButtons() {
  const commonButtonsStyle = {};

  commonButtonsStyle['border'] = '1px solid #ccc';
  commonButtonsStyle['background'] = 'transparent';
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

  buttonsGroup.appendChild(buttonYT);
  buttonsGroup.appendChild(buttonCDV);

  return {
    buttons: buttonsGroup,
    buttonYT,
    buttonCDV,
  };
}

function render(rootTag, youtubeComments, youtubeId) {
  const iframe = document.createElement('iframe');
  const { buttons, buttonYT, buttonCDV } = createButtons();

  buttonYT.onclick = () => {
    selectComments(buttonYT, buttonCDV);

    rootTag.removeChild(rootTag.lastChild);
    rootTag.appendChild(youtubeComments);
  };

  buttonCDV.onclick = () => {
    selectComments(buttonCDV, buttonYT);

    rootTag.removeChild(rootTag.lastChild);
    rootTag.appendChild(iframe);
  };

  iframe.id = 'cdv-iframe';
  iframe.src = 'https://cdv.localhost/?youtubeId=' + youtubeId;
  iframe.scrolling = 'no';
  iframe.style.width = '1px';
  iframe.style.minWidth = '100%';
  iframe.style.display = 'block';

  rootTag.appendChild(buttons);
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
