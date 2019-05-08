const form = document.getElementById('login-form');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');
const errorEmail = document.getElementById('error-email');
const errorPassword = document.getElementById('error-password');
const errorGlobal = document.getElementById('error-global');
const loader = document.getElementById('loader');
const login = document.getElementsByClassName('login')[0];
const logout = document.getElementsByClassName('logout')[0];
const loginBtn = document.getElementById('login');
const logoutBtn = document.getElementById('logout');

class RequestError extends Error {
  constructor(obj) {
    super(RequestError.getMessage(obj));
    this.error = obj;
    this.name = 'RequestError';
    this.scope = this.setScope(obj);
  }

  static getMessage(obj) {
    if (obj.message) {
      return ERRORS_TRADUCTION[obj.message] || ERRORS_TRADUCTION['UNKNOWN'];
    }

    if (obj.email && obj.email.isEmail) {
      return ERRORS_TRADUCTION[obj.email.isEmail] || ERRORS_TRADUCTION['UNKNOWN'];
    }

    return ERRORS_TRADUCTION['UNKNOWN'];
  }

  getErrorMessageForField(field) {
    if (this.error[field])
      return this.message;

    return '&nbsp;';
  }

  getGlobalErrorMessage() {
    if (this.error.message)
      return this.message;

    return '&nbsp;';
  }

  setScope(obj) {
    if (obj.message)
      return 'global';

    if (obj.email)
      return 'email';
  }
}

const startLoader = () => {
  loader.classList.remove('hidden');
  loginBtn.classList.add('loading');
}

const stopLoader = () => {
  loader.classList.add('hidden');
  loginBtn.classList.remove('loading');
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
  } catch (err) {
    if (err.name !== 'RequestError') {
      errorGlobal.innerHTML = ERRORS_TRADUCTION[err.message] || ERRORS_TRADUCTION['UNKNOWN'];
      errorEmail.innerHTML = '&nbsp';
      errorPassword.innerHTML = '&nbsp';
    } else {
      errorEmail.innerHTML = err.getErrorMessageForField('email');
      errorPassword.innerHTML = err.getErrorMessageForField('password');
      errorGlobal.innerHTML = err.getGlobalErrorMessage();
    }
  }
}

const handleSubmit = async () => {
  startLoader();

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

    if (!res.ok) {
      throw new RequestError(await res.json());
    }

    const body = await res.json();

    console.log('login success!', body.user);

    chrome.storage.local.set({
      token: body.token,
    });

    main();
  } finally {
    stopLoader();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});
