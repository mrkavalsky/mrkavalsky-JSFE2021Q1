const accordion = document.querySelector('.accordion');
const frame = document.getElementById('main-frame');
const slider = document.getElementById('slider');

function toggleAccordion(e) {
  if(!e.target.matches('.accordion__button')) return;
  e.target.classList.toggle('accordion__button_hidden');
  const item = e.target.closest('li');
  item.lastElementChild.classList.toggle('accordion-wrapper__p_hidden');
  item.classList.toggle('accordion__item_gray-border');
  item.firstElementChild.firstElementChild.classList.toggle('accordion__h3_blue');
}

function replaceVideo(e) {
  const item = e.target.closest('.slider__item');
  if(!item) return;
  const src = item.lastElementChild.src + '?autoplay=1';
  item.lastElementChild.src = frame.src.slice(0, frame.src.length - 11);
  frame.src = src;
}

accordion.addEventListener('click', toggleAccordion);
slider.addEventListener('click', replaceVideo);