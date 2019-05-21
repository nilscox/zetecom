window.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('popup-iframe');

  if (iframe) {
    iframe.src = `${process.env.BASE_URL}/popup`;
    iFrameResize({ log: false, checkOrigin: false }, iframe);
  }
});
