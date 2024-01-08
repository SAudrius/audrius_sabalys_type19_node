import { els } from './config.js';

export function createHamburgerClick(headerElement, hamElement) {
  hamElement.addEventListener('click', () => {
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

function createElement(el, attrArr, textContent = null) {
  const element = document.createElement(el);
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
  element.textContent = textContent;
  return element;
}

export async function fetchData(url, method = 'GET', postObj = null) {
  const fetchArgs = {};
  fetchArgs.method = method;
  if (postObj !== null) {
    fetchArgs.body = JSON.stringify(postObj);
    fetchArgs.headers = {
      'Content-Type': 'application/json',
    };
  }
  try {
    const res = await fetch(url, fetchArgs);
    const data = await res.json();
    return [data, null];
  } catch (err) {
    return [null, err];
  }
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

export function createOptionArr(arr) {
  return arr.map((obj) => {
    const el = document.createElement('option');
    el.value = obj.id;
    el.textContent = obj.name;
    return el;
  });
}

export function displayCard(obj) {
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
        ],
      },
      { type: ['button'] },
    ],
    'Delete'
  );
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
  buttonDiv.append(buttonDel, buttonAddToCart);
  secondDiv.append(nameEl, priceEl, descriptionEl, buttonDiv);
  mainDiv.append(imgEl, secondDiv);
  els.shop.cards.append(mainDiv);
}
