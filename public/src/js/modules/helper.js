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

export function loger() {
  console.log('hi');
}
