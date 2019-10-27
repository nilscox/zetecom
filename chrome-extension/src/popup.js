window.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('popup-iframe');

  if (iframe) {
    iframe.src = `${process.env.EXTENSION_URL}/popup`;
    iFrameResize({ log: false, checkOrigin: false }, iframe);
  }
});
