import { baseUrl, els } from './modules/config.js';
import {
  fetchData,
  createOrderCard,
  createOptionArr,
  findUserOrders,
  checkForToken,
  fetchNavigation,
  getRoleFieldFromServerToken,
} from './modules/helper.js';

(async () => {
  const isLogged = await checkForToken();
  if (isLogged === false) {
    window.location.href = 'login.html';
    return;
  }
  fetchNavigation(isLogged);
  const role = await getRoleFieldFromServerToken('user_role');
  const [usersArr, error] = await fetchData(`${baseUrl}/v1/api/users`);
  if (error) {
    console.warn('Server error');
    return;
  }
  if (role === 'admin') {
    els.index.select.parentElement.classList.remove('hidden');
    const userOption = createOptionArr(usersArr);
    // create options for select
    els.index.select.append(...userOption);
    // create on change eventlistener and look for use data
    els.index.select.addEventListener('change', findUserOrders);
  }
  // fetch full order List
  const [ordersArr, err] = await fetchData(`${baseUrl}/v1/api/orders`);
  if (err) {
    console.warn('Server error');
    return;
  }
  const orderCard = ordersArr.map((ordersObj) => createOrderCard(ordersObj));
  els.index.cards.append(...orderCard);
})();
