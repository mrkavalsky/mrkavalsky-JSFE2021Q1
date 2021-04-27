const fdbckBtn = document.getElementById('feedback-button');
const cover = document.getElementById('cover');
const popup = document.getElementById('popup');
const body = document.getElementById('body');

function togglePopup() {
  cover.classList.toggle('hidden');
  popup.classList.toggle('hidden');
  body.classList.toggle('body_overflow');
}

fdbckBtn.addEventListener('click', togglePopup);
cover.addEventListener('click', togglePopup);