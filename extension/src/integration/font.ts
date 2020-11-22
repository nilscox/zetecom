const loadFont = () => {
  const font = document.createElement('link');

  font.href = 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap';
  font.rel = 'stylesheet';

  document.head.appendChild(font);
};

export default loadFont;
