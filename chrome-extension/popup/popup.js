const form = document.getElementById('login-form');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const errorEmail = document.getElementById('error-email');
const errorPassword = document.getElementById('error-password');
const errorGlobal = document.getElementById('error-global');
const login = document.getElementsByClassName('login')[0];
const logout = document.getElementsByClassName('logout')[0];
const logoutBtn = document.getElementById('logout');

class RequestError extends Error {
  constructor(obj) {
    super(RequestError.getMessage(obj));
    this.name = 'RequestError';
    this.scope = this.setScope(obj);
  }

  static getMessage(obj) {
    if (obj.message) {
      return ERRORS_TRADUCTION[obj.message];
    }

    if (obj.email && obj.email.isEmail) {
      return ERRORS_TRADUCTION[obj.email.isEmail];
    }

    return 'unknown error';
  }

  setScope(obj) {
    if (obj.message)
      return 'global';

    if (obj.email)
      return 'email';
  }
}

const main = () => {
  chrome.storage.local.get('token', ({ token }) => {
    (token ? logout : login).classList.remove('hidden');
    (token ? login : logout).classList.add('hidden');
  });
};

logoutBtn.onclick = function() {
  chrome.storage.local.set({ token: null });
  main();
}

form.onsubmit = async (e) => {
  try {
    e.preventDefault();
    await handleSubmit();
  } catch (e) {
    console.log(e);
    console.log(e.scope);

    if (e.scope === 'global') {
      errorGlobal.innerHTML = e.message;
      errorEmail.innerHTML = '&nbsp';
    }

    if (e.scope === 'email') {
      errorEmail.innerHTML = e.message;
      errorGlobal.innerHTML = '&nbsp';
    }
  }
}

const handleSubmit = async () => {
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
    throw new RequestError(await res.json());

  const body = await res.json();

  console.log('login success!', body.user);

  chrome.storage.local.set({
    token: body.token,
  });

  main();
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});
