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

    const body = await res.json();

    console.log('login success!', body.user);

    chrome.storage.local.set({
      token: body.token,
    });
  } catch (e) {
    console.error(e);
  }
}
