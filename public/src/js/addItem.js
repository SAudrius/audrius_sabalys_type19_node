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
  if (isLogged === false) {
    window.location.href = 'login.html';
    return;
  }
  fetchNavigation(isLogged);
  const [result, err] = await fetchData(`${baseUrl}/v1/api/item_types`);
  if (err) {
    console.log('err ===', err);
    console.log('server error');
  }
  const optionArray = createOptionArr(result);
  els.addItems.formOptions.append(...optionArray);
  // create Event Listener
  els.addItems.form.addEventListener('submit', async (e) => {
    e.preventDefault(e);
    const tar = e.target;
    const name = e.target.name.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const itemType = e.target.item_type_id.value;
    const postObj = {
      name,
      price,
      description,
      image,
      item_type_id: itemType,
    };
    console.log('postObj ===', postObj);

    const [rows, err] = await fetchData(
      `${baseUrl}/v1/api/shop_items`,
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
    window.location.href = 'shop.html';
    // redirect to shop
  });
})();
