const filters = document.querySelector('.filters');
const resetBtn = document.getElementById('btn-reset');
const nextBtn = document.getElementById('btn-next');
const image = document.getElementById('image');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

function handleFilters(input) {
  const suffix = input.dataset.sizing;
  const output = input.nextSibling.nextSibling;
  output.value = input.value;
  document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
}

function resetFilters() {
  const arr = [...filters.children];
  arr.forEach(label => {
    const input = label.children[0];
    input.value = input.defaultValue;
    handleFilters(input);
  });
}

function getInput(e) {
  const input = e.target;
  handleFilters(input);
}

function setImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    image.src = src;
  };
}

function getImage() {
  const index = i % images.length;
  const imageSrc = base + images[index];
  setImage(imageSrc);
  i++;
}

filters.addEventListener('input', getInput);
resetBtn.addEventListener('click', resetFilters);
nextBtn.addEventListener('click', getImage);