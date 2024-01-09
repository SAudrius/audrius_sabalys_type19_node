export const baseUrl = 'http://localhost:3000';
export const els = {
  navigation: {
    header: document.querySelector('header'),
    footer: document.querySelector('footer'),
  },
  shop: { cards: document.getElementById('cards') },
  addItems: {
    form: document.getElementById('addItem'),
    formOptions: document.getElementById('item_type_id'),
  },
  register: {
    form: document.getElementById('registerForm'),
    formOptions: document.getElementById('role_id'),
  },
  logIn: {
    form: document.getElementById('loginForm'),
    errorBox: document.getElementById('errorBox'),
  },
  index: {
    cards: document.getElementById('cards'),
    select: document.getElementById('users'),
  },
};
