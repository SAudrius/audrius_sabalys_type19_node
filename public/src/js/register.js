import { els, baseUrl } from './modules/config.js';
import {
  fetchData,
  createOptionArr,
  displayFormErrors,
  hasToken,
} from './modules/helper.js';

(async () => {
  if (!hasToken()) return;
  const [result, err] = await fetchData(`${baseUrl}/v1/api/users_roles`);
  if (err) {
    console.log('err ===', err);
    console.log('display error');
  }
  const optionArray = createOptionArr(result);
  els.register.formOptions.append(...optionArray);
  // create Event Listener
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
    console.log('postObj ===', postObj);

    const [rows, err] = await fetchData(
      `${baseUrl}/v1/api/auth/register`,
      'post',
      postObj
    );
    if (err) {
      console.log('Server error');
    }
    if (rows.errors) {
      console.log('errors needs to be displayed');
      console.log(rows);
      displayFormErrors(rows, tar);

      // display error
      return;
    }
    console.log(rows);
    // redirect to shop
  });
})();
