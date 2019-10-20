if (!window.env)
  window.env = {};

var BASE_URL = window.env.BASE_URL;
var NODE_ENV = window.env.NODE_ENV;

// mobile navigation

var navigation = document.querySelector('.navigation');
var burger = navigation.querySelector('.navigation-burger');
var main = document.querySelector('main');

var navigationOpen = false;

function showNavigation(show) {
  navigationOpen = show;

  if (navigationOpen)
    navigation.classList.add('open');
  else
    navigation.classList.remove('open');
}

burger.addEventListener('click', function() { showNavigation(!navigationOpen); });
main.addEventListener('click', function() { showNavigation(false); });

// email validated

var emailValidated = document.querySelector('.email-validated');
var emailValidatedClose = emailValidated.querySelector('.close');

if (window.location.search.match(/email-validated=true/)) {
  var uri = window.location.toString().replace(/email-validated=[^&]*&?/, '').replace(/\?$/, '');

  window.history.replaceState({}, document.title, uri);

  emailValidated.classList.add('show');

  setTimeout(function() { emailValidated.classList.remove('show') }, 10000);

  emailValidatedClose.addEventListener('click', function() {
    emailValidated.classList.remove('show');
  });
}

// new name banner

var newNameBanner = document.querySelector('#new-name-banner');
var newNameBannerClose = newNameBanner.querySelector('.close');

newNameBannerClose.addEventListener('click', function() {
  localStorage.setItem('nn', 1);
  newNameBanner.classList.add('hide');
});

if (!localStorage.getItem('nn'))
  newNameBanner.classList.remove('hide');

// tlkio

window.addEventListener('DOMContentLoaded', function() {
  if (NODE_ENV === 'production')
    window.postMessage({ type: 'TLKIO_READY' }, BASE_URL);
});
