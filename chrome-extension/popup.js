const form = document.getElementById('login-form');
const inputEmail = document.getElementById('input-email');
const inputPassword = document.getElementById('input-password');

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

    if (!res.headers.has('Set-Cookie'))
      throw new Error('response has no Set-Cookie header');

    chrome.storage.local.set({
      cookie: res.headers.get('Set-Cookie'),
    });
  } catch (e) {
    console.error(e);
  }

  // chrome.storage.local.set({
  //   email: inputEmail.value,
  //   password: inputPassword.value,
  // });
}
