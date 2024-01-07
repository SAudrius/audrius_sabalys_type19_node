import { createHamburgerClick } from './helper.js';
// fetchinu Footer, kad nereiketu vel kuopijoti
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/public/components/footer.html');
    const html = await res.text();
    document.querySelector('footer').innerHTML = html;
  } catch (err) {
    console.log('err ===', err);
    console.warn('Footer failed to fetched');
    return;
  }
});
