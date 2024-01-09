import { baseUrl, els } from './modules/config.js';
import {
  fetchData,
  createOrderCard,
  createOptionArr,
  findUserOrders,
} from './modules/helper.js';

(async () => {
  const [usersArr, error] = await fetchData(`${baseUrl}/v1/api/users`);
  if (error) {
    console.log(error);
  }
  const userOption = createOptionArr(usersArr);
  // create options for select
  els.index.select.append(...userOption);
  // create on change eventlistener and look for use data
  console.log('els.index.select ===', els.index.select);
  els.index.select.addEventListener('change', findUserOrders);
  // fetch full order List
  const [ordersArr, err] = await fetchData(`${baseUrl}/v1/api/orders`);
  if (err) {
    console.log(err);
  }
  const orderCard = ordersArr.map((ordersObj) => createOrderCard(ordersObj));
  els.index.cards.append(...orderCard);
})();
