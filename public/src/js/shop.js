import { baseUrl } from './modules/config.js';
import { fetchData, displayCard } from './modules/helper.js';

(async () => {
  const [result, err] = await fetchData(`${baseUrl}/v1/api/shop_items`);
  if (err) {
    console.log(err);
    return;
  }
  result.forEach((singleOrder) => displayCard(singleOrder));
  console.log(result);
})();
