console.log = (...message) => {
  document.querySelector('#app').innerText += JSON.stringify(message) + '\n';
};

const postMessageToIframe = (type, payload) => {
  console.log('send event', { type, ...payload });
  window.parent.postMessage({ type, ...payload }, 'chrome-extension://jknfanplehjmcpmhpbioodpiaahehldl');
};

const fetchMe = async () => {
  try {
    const res = await fetch(`https://cdv.localhost/api/auth/me`);
    const body = await res.json();

    if (!res.ok)
      throw { status: res.status, body };

    console.log('fetch-me success!', body.user);
    postMessageToIframe('fetch-me-success');
  } catch (e) {
    console.log('fetch-me error', e);
    postMessageToIframe('fetch-me-error', { error: e });
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
    });

    const body = await res.json();

    if (!res.ok)
      throw { status: res.status, body };

    console.log('login success!', body.user);
    postMessageToIframe('login-success');
  } catch (e) {
    console.log('login error', e);
    postMessageToIframe('login-error', { error: e });
  }
};

const logout = async () => {
  try {
    const res = await fetch(`https://cdv.localhost/api/auth/logout`, {
      method: 'POST',
    });

    if (!res.ok)
      throw { status: res.status, body: await res.json() };

    console.log('logout success!');
    postMessageToIframe('logout-success');
  } catch (e) {
    console.log('logout error', e);
    // postMessageToIframe('logout-error', { error: e });
  }
};

const handleEvent = (data) => {
  console.log('recv event', data);

  switch (data.type) {
    case 'fetch-me':
      fetchMe();
      break;

    case 'login':
      login(data.email, data.password);
      break;

    case 'logout':
      logout();
      break;
  }

};

const main = () => {
  console.log('lets go (iframe)!');
  window.addEventListener('message', (evt) => {
    const { data } = evt;

    if (data)
      handleEvent(data);
  }, false);
};

document.addEventListener('DOMContentLoaded', main);
