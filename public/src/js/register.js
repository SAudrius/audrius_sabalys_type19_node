import { els, baseUrl } from './modules/config.js';
import {
  fetchData,
  createOptionArr,
  displayFormErrors,
  checkForToken,
  fetchNavigation,
} from './modules/helper.js';

(async () => {
  const isLogged = await checkForToken();
  if (isLogged === true) {
    window.location.href = 'index.html';
    return;
  }
  fetchNavigation(isLogged);
  const [result, err] = await fetchData(`${baseUrl}/v1/api/users_roles`);
  if (err) {
    console.warn('Server error');
    return;
  }
  const optionArray = createOptionArr(result);
  els.register.formOptions.append(...optionArray);
  // handle form on submit
  els.register.form.addEventListener('submit', async (e) => {
    e.preventDefault(e);
    const tar = e.target;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repeatPassword = e.target.repeat_password.value;
    const role = e.target.role_id.value;
    const postObj = {
      name,
      email,
      password,
      repeat_password: repeatPassword,
      role_id: role,
    };
    const [rows, err] = await fetchData(
      `${baseUrl}/v1/api/auth/register`,
      'post',
      postObj
    );
    if (err) {
      console.warn('Server error');
      return;
    }
    if (rows?.errors) {
      displayFormErrors(rows, tar);
      return;
    }
    if (rows?.accessToken) {
      localStorage.setItem('LOGGED', rows?.accessToken);
      window.location.href = 'index.html';
    }
  });
})();
