import { iframeResizer } from 'iframe-resizer';

window.addEventListener('DOMContentLoaded', () => {
  const iframe: HTMLIFrameElement = document.getElementById('popup-iframe') as HTMLIFrameElement;

  if (iframe) {
    iframe.src = `${process.env.APP_URL}/popup`;
    iframeResizer({ log: false, checkOrigin: false }, iframe);
  }
});
