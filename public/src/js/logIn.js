import { baseUrl, els } from './modules/config.js';
import {
  displayCustomErrors,
  displayFormErrors,
  fetchData,
  hasToken,
} from './modules/helper.js';

(async () => {
  if (!hasToken()) return;

  els.logIn.form.addEventListener('submit', async (e) => {
    e.preventDefault(e);
    const tar = e.target;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const postObj = {
      email,
      password,
    };

    const [rows, err] = await fetchData(
      `${baseUrl}/v1/api/auth/login`,
      'post',
      postObj
    );
    if (err) {
      console.log('Server error');
    }
    if (rows?.errors) {
      //   console.log(rows);
      displayCustomErrors(rows, els.logIn.errorBox);
      return;
    }
    localStorage.setItem('LOGGED', rows.accessToken);
    window.location.href = 'index.html';
  });
})();
