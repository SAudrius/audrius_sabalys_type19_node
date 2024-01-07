import { createHamburgerClick } from './helper.js';
// fetchinu header, kad nereiketu vel kuopijoti
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/public/components/header.html');
    const html = await res.text();
    document.querySelector('header').innerHTML = html;
    const header = document.querySelector('header');
    const hamburger = header.querySelector('#hamburger');
    createHamburgerClick(header, hamburger);
  } catch (err) {
    console.log('err ===', err);
    console.warn('Navigation not fetched');
    return;
  }
});
