console.log = (...message) => {
  document.querySelector('#app').innerText += JSON.stringify(message) + '\n';
};

const postMessageToIframe = (type, payload) => {
  console.log('send event', { type, ...payload });
  window.parent.postMessage({ type, ...payload }, 'chrome-extension://lfpcdmmobbgnoemblodlacgfceppipni');
};

const fetchMe = async () => {
  try {
    const res = await fetch(`https://cdv.localhost/api/auth/me`, {
      credentials: 'include',
    });
    const body = await res.json();

    if (!res.ok)
      throw { status: res.status, body };

    console.log('fetch-me success!', body);
    postMessageToIframe('FETCH_ME_SUCCESS', { user: body });
  } catch (e) {
    console.log('fetch-me failure', e);
    postMessageToIframe('FETCH_ME_FAILURE', { error: e });
  }
};

const login = async (email, password) => {
  try {
    const res = await fetch(`https://cdv.localhost/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const body = await res.json();

    if (!res.ok)
      throw { status: res.status, body };

    console.log('login success!', body);
    postMessageToIframe('LOGIN_SUCCESS', { user: body });
  } catch (e) {
    console.log('login failure', e);
    postMessageToIframe('LOGIN_FAILURE', { error: e });
  }
};

const logout = async () => {
  try {
    const res = await fetch(`https://cdv.localhost/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok)
      throw { status: res.status, body: await res.json() };

    console.log('logout success!');
    postMessageToIframe('LOGOUT_SUCCESS');
  } catch (e) {
    console.log('logout failure', e);
    // postMessageToIframe('LOGOUT_FAILURE', { error: e });
  }
};

const signup = async (email, password, nick) => {
  try {
    const res = await fetch(`https://cdv.localhost/api/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password, nick }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const body = await res.json();

    if (!res.ok)
      throw { status: res.status, body };

    console.log('signup success!', body);
    postMessageToIframe('SIGNUP_SUCCESS', { user: body });
  } catch (e) {
    console.log('signup failure', e);
    postMessageToIframe('SIGNUP_FAILURE', { error: e });
  }
};

const handleEvent = (data) => {
  console.log('recv event', data);

  switch (data.type) {
    case 'FETCH_ME':
      fetchMe();
      break;

    case 'LOGIN':
      login(data.email, data.password);
      break;

    case 'LOGOUT':
      logout();
      break;

    case 'SIGNUP':
      signup(data.email, data.password, data.nick);
      break;
  }

};

const main = () => {
  console.log('lets go (iframe)!');
  window.addEventListener('message', (evt) => {
    const { data } = evt;
    console.log(evt);
    if (data)
      handleEvent(data);
  }, false);

  postMessageToIframe('IFRAME_READY');
};

document.addEventListener('DOMContentLoaded', main);
