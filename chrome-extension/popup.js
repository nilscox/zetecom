const form = document.getElementById('login-form');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const login = document.getElementsByClassName('login')[0];
const logout = document.getElementsByClassName('logout')[0];
const logoutBtn = document.getElementById('logout');

const main = () => {
  chrome.storage.local.get('token', ({ token }) => {
    (token ? logout : login).classList.remove('hide');
    (token ? login : logout).classList.add('hide');
  });
};

logoutBtn.onclick = function() {
  chrome.storage.local.set({ token: null });
  main();
}

form.onsubmit = async function(e) {
  e.preventDefault();

  try {
    const res = await fetch(`https://cdv.localhost/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok)
      throw new Error('request error');

    const body = await res.json();

    console.log('login success!', body.user);

    chrome.storage.local.set({
      token: body.token,
    });

    main();
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});
