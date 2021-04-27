const fdbckBtn = document.getElementById('feedback-button');
const cover = document.getElementById('cover');
const popup = document.getElementById('popup');
const body = document.getElementById('body');
const animals = [
  {
    imgSrc: '../../assets/images/zoogeography__animal-photo0.png',
    title: 'Eagle',
    text: 'The broadcast is from an island near Los Angeles. Watch their real life.',
    linkSrc: '../zoos-translation/eagle/eagle.html',
  },
  {
    imgSrc: '../../assets/images/zoogeography__animal-photo1.png',
    title: 'Alligator',
    text: 'The broadcast is from Florida. See their real life.',
    linkSrc: '../zoos-translation/alligator/alligator.html',
  },
  {
    imgSrc: '../../assets/images/zoogeography__animal-photo2.png',
    title: 'Gorilla',
    text: 'The broadcast comes from the Democratic Republic of the Congo in a forest area. Watch their life and life together',
    linkSrc: '../zoos-translation/gorilla/gorilla.html',
  },
  {
    imgSrc: '../../assets/images/zoogeography__animal-photo3.png',
    title: 'Panda',
    text: 'The broadcast comes from the mountainous regions of central China: Sichuan and Tibet. See their real life together.',
    linkSrc: '../zoos-translation/panda/panda.html',
  },
];

function togglePopup() {
  cover.classList.toggle('hidden');
  popup.classList.toggle('hidden');
  body.classList.toggle('body_overflow');
}

fdbckBtn.addEventListener('click', togglePopup);
cover.addEventListener('click', togglePopup);