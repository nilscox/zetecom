const { BASE_URL } = window.env || {};

// mobile navigation

const navigation = document.querySelector('.navigation');
const burger = navigation.querySelector('.navigation-burger');

let navigationOpen = false;

burger.addEventListener('click', () => {
  navigationOpen = !navigationOpen;

  if (navigationOpen)
    navigation.classList.add('open');
  else
    navigation.classList.remove('open');
});

// new name banner

const newNameBanner = document.querySelector('#new-name-banner');
const newNameBannerClose = newNameBanner.querySelector('.close');

newNameBannerClose.addEventListener('click', () => {
  localStorage.setItem('nn', 1);
  newNameBanner.classList.add('hide');
});

if (!localStorage.getItem('nn'))
  newNameBanner.classList.remove('hide');

// tlkio

if (BASE_URL && !BASE_URL.match(/localhost/))
  window.postMessage({ type: 'TLKIO_READY' }, window.env.BASE_URL);
