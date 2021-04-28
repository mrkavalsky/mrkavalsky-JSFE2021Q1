const accordion = document.querySelector('.accordion');

function toggleAccordion(e) {
  if(!e.target.matches('.accordion__button')) return;
  e.target.classList.toggle('accordion__button_hidden');
  e.target.closest('li').lastElementChild.classList.toggle('accordion-wrapper__p_hidden');
}

accordion.addEventListener('click', toggleAccordion);