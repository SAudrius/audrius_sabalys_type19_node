import { baseUrl } from './modules/config.js';
import { fetchData, displayCard, checkForToken } from './modules/helper.js';

(async () => {
  if ((await checkForToken()) === false) return;
  const token = localStorage.getItem('LOGGED');
  const [result, err] = await fetchData(`${baseUrl}/v1/api/shop_items`);
  if (err) {
    console.warn('server Error');
    return;
  }
  result.forEach((singleOrder) => displayCard(singleOrder));
})();
