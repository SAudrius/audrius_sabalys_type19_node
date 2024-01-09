import { baseUrl, els } from './config.js';

export function createHamburgerClick(headerElement, hamElement) {
  hamElement.addEventListener('click', () => {
    console.log('click');
    const hamChildElements = hamElement.children;
    const nav = headerElement.querySelector('#nav');
    const ul = headerElement.querySelector('#ul');
    const navClassArr = [
      'absolute',
      'top-full',
      'left-0',
      'bg-secondary',
      'justify-start',
      'py-10',
      'border-t',
      'border-black',
      'px-4',
      'mb:px-4',
      'gap-6',
    ];
    const ulClassArr = ['grid', 'grid-columns-1', 'container', 'mx-auto'];

    if (hamElement.dataset.status === 'active') {
      // Su css butu geriau, bet norejau isbandyti su tailwind animacijas
      hamElement.dataset.status = 'inactive';
      //   removing class for displaying mobile menu
      nav.classList.add('hidden', 'gap-8');
      ul.classList.add('justify-end');
      nav.classList.remove(...navClassArr);
      ul.classList.remove(...ulClassArr);
      //   animating hamburger
      hamChildElements[0].classList.remove('rotate-45', 'translate-y-2.5');
      hamChildElements[1].classList.remove('opacity-0');
      hamChildElements[1].classList.add('opacity-1');
      hamChildElements[2].classList.remove('-rotate-45', '-translate-y-2.5');
    } else {
      hamElement.dataset.status = 'active';
      //   adding class for displaying mobile menu
      nav.classList.remove('hidden', 'gap-8');
      ul.classList.remove('justify-end');
      nav.classList.add(...navClassArr);
      ul.classList.add(...ulClassArr);
      //   animating cross
      hamChildElements[0].classList.add('rotate-45', 'translate-y-2.5');
      hamChildElements[1].classList.add('opacity-0', 'duration-200');
      hamChildElements[2].classList.add('-rotate-45', '-translate-y-2.5');
    }
  });
}

function createElement(el, attrArr = null, textContent = null) {
  const element = document.createElement(el);
  element.textContent = textContent;
  if (!attrArr) return element;
  attrArr.forEach((attrObj) => {
    for (const key in attrObj) {
      attrObj[key].forEach((value) => {
        if (key === 'class') {
          element.classList.add(value);
        } else {
          element.setAttribute(key, value);
        }
        return element;
      });
    }
  });
  return element;
}

export async function fetchData(
  url,
  method = 'GET',
  postObj = null,
  token = null,
  type = 'json'
) {
  const fetchArgs = {};
  fetchArgs.method = method;
  if (postObj !== null && type === 'json') {
    fetchArgs.body = JSON.stringify(postObj);
    fetchArgs.headers = {
      'Content-Type': 'application/json',
    };
  }
  if (token) {
    fetchArgs.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  try {
    console.log('url ===', url);
    const res = await fetch(url, fetchArgs);
    let data = '';
    if (type === 'json') {
      data = await res.json();
    }
    if (type === 'html') {
      data = await res.text();
    }
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}

export async function fetchNavigation(logged = false) {
  const role = await getRoleFieldFromServerToken('user_role');
  let header;
  let headerErr;
  let footer;
  let footerErr;
  // jeigu neprisijunges
  if (logged === false) {
    [header, headerErr] = await fetchData(
      `${baseUrl}/v1/api/html/nav`,
      'GET',
      null,
      null,
      'html'
    );
    [footer, footerErr] = await fetchData(
      `${baseUrl}/v1/api/html/footer`,
      'GET',
      null,
      null,
      'html'
    );
  }
  // jeigu adminas
  if (role === 'admin') {
    [header, headerErr] = await fetchData(
      `${baseUrl}/v1/api/html/nav-logged-admin`,
      'GET',
      null,
      null,
      'html'
    );
    [footer, footerErr] = await fetchData(
      `${baseUrl}/v1/api/html/footer-logged-admin`,
      'GET',
      null,
      null,
      'html'
    );
  }
  // jeigu ne admins bet prisijunges
  if (role !== 'admin' && role !== false) {
    [header, headerErr] = await fetchData(
      `${baseUrl}/v1/api/html/nav-logged`,
      'GET',
      null,
      null,
      'html'
    );
    [footer, footerErr] = await fetchData(
      `${baseUrl}/v1/api/html/footer-logged`,
      'GET',
      null,
      null,
      'html'
    );
  }
  // navigation for mobile hamburger
  if (footerErr || headerErr) {
    console.warn('server error');
    return;
  }
  els.navigation.header.innerHTML = header;
  els.navigation.footer.innerHTML = footer;
  const logoutNodeArr = document.querySelectorAll('.logout');
  logoutNodeArr.forEach((element) => eventLogout(element));
  const headerEl = document.querySelector('header');
  const hamburger = header.querySelector('#hamburger');
  createHamburgerClick(headerEl, hamburger);
}

export async function checkForToken() {
  const token = localStorage.getItem('LOGGED');
  const [tokenRes, tokenErr] = await fetchData(
    `${baseUrl}/v1/api/auth/token`,
    'POST',
    null,
    token
  );
  if (tokenErr) {
    console.log('tokenErr ===', tokenErr);
    console.warn('Server Error');
    return false;
  }
  // Jeigu neturi tokeno arba neteisingas tokenas
  if (tokenRes?.status === 'false') {
    return false;
  }
  return true;
}

export function hasToken() {
  const token = localStorage.getItem('LOGGED');
  if (token) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

export function eventLogout(el) {
  console.log('el ===', el);
  el.addEventListener('click', () => {
    console.log('click');
    localStorage.removeItem('LOGGED');
    window.location.href = 'login.html';
  });
}
export async function getIdFromServer() {
  const token = localStorage.getItem('LOGGED');
  const [tokenRes, tokenErr] = await fetchData(
    `${baseUrl}/v1/api/auth/token`,
    'POST',
    null,
    token
  );
  if (tokenErr) {
    console.log('tokenErr ===', tokenErr);
    console.warn('Server Error');
    return;
  }
  console.log('token.user_id ===', tokenRes.user_id);
  return tokenRes.user_id;
}
export async function getRoleFieldFromServerToken(field) {
  const token = localStorage.getItem('LOGGED');
  const [tokenRes, tokenErr] = await fetchData(
    `${baseUrl}/v1/api/auth/token`,
    'POST',
    null,
    token
  );
  if (tokenErr) {
    console.log('tokenErr ===', tokenErr);
    console.warn('Server Error');
    return;
  }
  console.log('tokenRes ===', tokenRes);
  return tokenRes[field];
}

export function displayFormErrors(errorObj, form) {
  // delete error messages before creating new
  const elementsToRemove = document.querySelectorAll('.error-field-active');
  elementsToRemove.forEach((element) => {
    element.remove();
  });
  // inputs border reset on update
  const elementsToRemoveBorder = document.querySelectorAll('input');
  elementsToRemoveBorder.forEach((element) => {
    element.classList.add('border-primary');
    element.classList.remove('border-red-500');
  });
  for (const [key, value] of Object.entries(errorObj.errors)) {
    const inputElement = form.querySelector(`#${value.key}`);
    const elementToAppend = inputElement.parentElement;
    const element = createElement(
      'p',
      [{ class: ['mt-1', 'text-red-500', 'error-field-active'] }],
      value.message
    );
    console.log('element ===', element);
    elementToAppend.append(element);
    inputElement.classList.remove('border-primary');
    inputElement.classList.add('border-red-500');
  }
}

export function displayCustomErrors(errorObj, elementToAppend) {
  elementToAppend.innerHTML = '';
  for (const [key, value] of Object.entries(errorObj.errors)) {
    const element = createElement(
      'p',
      [{ class: ['mt-1', 'text-red-500', 'error-field-active'] }],
      value.message
    );
    elementToAppend.append(element);
  }
}

export function createOptionArr(arr) {
  return arr.map((obj) => {
    const el = document.createElement('option');
    el.value = obj.id;
    el.textContent = obj.name;
    return el;
  });
}

export async function findUserOrders(e) {
  els.index.cards.textContent = '';
  const userId = e.target.value;
  const [userOrderArr, err] = await fetchData(
    `${baseUrl}/v1/api/orders/user/${userId}`
  );
  console.log('userOrderArr ===', userOrderArr);
  const orderCardsArr = userOrderArr.map((orderObj) =>
    createOrderCard(orderObj)
  );
  els.index.cards.append(...orderCardsArr);
}

export function createOrderCard(obj) {
  console.log('arr ===', obj);
  const description = obj.description.slice(0, 53) + '...';
  const totalPrice = (obj.quantity * obj.total_price).toFixed(2) + '$';
  const mainDiv = createElement('div', [{ class: ['w-300'] }]);
  const colorDiv = createElement('div', [
    { class: ['p-4', 'bg-secondary', 'rounded-xl'] },
  ]);
  const orderId = createElement('p', null, 'Orders ID:');
  const orderIdSpan = createElement('span', null, obj.id);
  const orderItemName = createElement(
    'h2',
    [{ class: ['text-2xl', 'font-medium'] }],
    obj.name
  );
  const orderPrice = createElement(
    'p',
    [{ class: ['mt-1', 'text-lg', 'font-medium'] }],
    obj.total_price + '$'
  );
  const orderDescription = createElement(
    'p',
    [{ class: ['mt-1'] }],
    description
  );
  const orderQuantity = createElement(
    'p',
    [{ class: ['mt-1', 'font-medium'] }],
    'Quantity: '
  );
  const orderQuantitySpan = createElement('span', null, obj.quantity);
  const orderTotalPrice = createElement(
    'span',
    [{ class: ['mt-1', 'text-xl', 'font-medium'] }],
    'Total price: '
  );
  const orderTotalPriceSpan = createElement('span', null, totalPrice);
  orderId.append(orderIdSpan);
  orderQuantity.append(orderQuantitySpan);
  orderTotalPrice.append(orderTotalPriceSpan);
  colorDiv.append(
    orderId,
    orderItemName,
    orderPrice,
    orderDescription,
    orderQuantity,
    orderTotalPrice
  );
  mainDiv.append(colorDiv);
  return mainDiv;
}

export async function displayCard(obj) {
  const role = await getRoleFieldFromServerToken('user_role');
  const id = obj.id;
  const price = obj.price;
  const name = obj.name;
  const description = obj.description.slice(0, 53) + '...';
  const imageUrl = obj.image;
  const mainDiv = createElement('div', [{ class: ['w-300'] }]);
  const imgEl = createElement('img', [
    { src: [imageUrl] },
    {
      alt: ['Product image'],
      class: ['bg-gray-500', 'h-60', 'rounded-t-xl', 'object-cover', 'w-full'],
    },
  ]);
  const secondDiv = createElement('div', [
    { class: ['p-4', 'bg-secondary', 'rounded-b-xl'] },
  ]);
  const nameEl = createElement(
    'h2',
    [{ class: ['text-2xl', 'font-medium'] }],
    name
  );
  const priceEl = createElement(
    'p',
    [{ class: ['mt-2', 'text-lg', 'font-medium'] }],
    price
  );
  const descriptionEl = createElement('p', [{ class: ['mt-1'] }], description);
  const buttonDiv = createElement('div', [
    { class: ['flex', 'justify-between', 'mt-3'] },
  ]);
  const buttonAddToCart = createElement(
    'button',
    [
      {
        class: [
          'col-span-1',
          'px-5',
          'py-3',
          'text-white',
          'justify-self-end',
          'bg-primary',
          'rounded-xl',
        ],
      },
      { type: ['button'] },
    ],
    'Add to Cart'
  );
  console.log('role ===', role);
  if (role === 'admin') {
    const buttonDel = createElement(
      'button',
      [
        {
          class: [
            'col-span-1',
            'px-5',
            'py-3',
            'text-white',
            'bg-red-400',
            'rounded-xl',
            'cursor-pointer',
          ],
        },
        { type: ['button'] },
      ],
      'Delete'
    );
    createCardDelete(buttonDel, id);
    buttonDiv.append(buttonDel);
  }
  createAddToCart(buttonAddToCart, id, price);
  buttonDiv.append(buttonAddToCart);
  secondDiv.append(nameEl, priceEl, descriptionEl, buttonDiv);
  mainDiv.append(imgEl, secondDiv);
  els.shop.cards.append(mainDiv);
}

export function createAddToCart(element, itemId, price) {
  element.addEventListener('click', async () => {
    console.log('click');
    const userId = await getRoleFieldFromServerToken('user_id');
    const postObj = {
      user_id: userId,
      shop_item_id: itemId,
      quantity: 1,
      total_price: price,
    };
    const [res, err] = await fetchData(
      `${baseUrl}/v1/api/orders`,
      'POST',
      postObj
    );
    if (err) {
      console.warn('server error');
    }
    // order created ...
  });
}

export function createCardDelete(element, itemId) {
  element.addEventListener('click', async (e) => {
    const greatGrandParent = e.target.parentElement.parentElement.parentElement;
    const [res, err] = await fetchData(
      `${baseUrl}/v1/api/shop_items/${itemId}`,
      'DELETE'
    );
    if (err) {
      console.warn('server error');
    }
    greatGrandParent.remove();
  });
}
