import { baseUrl } from './modules/config.js';
import {
  fetchData,
  displayCard,
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
  if ((await checkForToken()) === false) return;
  // const token = localStorage.getItem('LOGGED');
  const [result, err] = await fetchData(`${baseUrl}/v1/api/shop_items`);
  if (err) {
    console.warn('server Error');
    return;
  }
  result.forEach(async (singleOrder) => await displayCard(singleOrder));
})();
