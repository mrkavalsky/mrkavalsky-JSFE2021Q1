const filters = document.querySelector('.filters');
const resetBtn = document.getElementById('btn-reset');
const nextBtn = document.getElementById('btn-next');
const loadBtn = document.getElementById('btnInput');
const image = document.getElementById('image');
const saveBtn = document.getElementById('btn-save');
const fullScrnBrn = document.getElementById('fullscreen');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;

image.setAttribute('crossOrigin', 'anonymous'); 

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
  const time = getTime();
  const imageSrc = base + time + images[index];
  setImage(imageSrc);
  i++;
}

function getTime() {
  const today = new Date();
  const hour = today.getHours();
  if (hour < 6) {
    return 'night/';
  } else if (hour < 12){
    return 'morning/';
  } else if (hour < 18) {
    return 'day/';
  } else {
    return 'evening/';
  };
}

function getFile() {
  const file = loadBtn.files[0];
  const reader = new FileReader();
  let src;
  reader.onload = () => {
    src = reader.result;
    setImage(src);
  }
  reader.readAsDataURL(file);
}

function resetInput() {
  loadBtn.value = '';
}

function setFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
      document.exitFullscreen();
  }
}

function drawImage() {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  downloadFile(dataURL);
}

function downloadFile(dataURL) {
  const link = document.createElement('a');
  link.download = 'download.png';
  link.href = dataURL;
  link.click();
  link.delete;
}

filters.addEventListener('input', getInput);
resetBtn.addEventListener('click', resetFilters);
nextBtn.addEventListener('click', getImage);
nextBtn.addEventListener('click', resetInput);
loadBtn.addEventListener('change', getFile);
fullScrnBrn.addEventListener('click', setFullScreen);
saveBtn.addEventListener('click', drawImage);