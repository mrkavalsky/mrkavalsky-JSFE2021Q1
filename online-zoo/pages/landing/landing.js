const fdbckBtn = document.getElementById('feedback-button');
const cover = document.getElementById('cover');
const popup = document.getElementById('popup');
const body = document.getElementById('body');
const map = document.querySelector('.zoogeography__map');
const card = document.querySelector('.zoogeography__animal');
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

function toggleAnimalCard(e) {
  const mark = e.target.closest('li');
  if (!mark) return;
  const pos = mark.dataset.pos;
  const img = card.firstElementChild.lastElementChild;
  const content = card.lastElementChild.children;

  img.src = animals[pos].imgSrc;
  content[0].innerText = animals[pos].title;
  content[1].innerText = animals[pos].text;
  content[2].href = animals[pos].linkSrc;

  for (let i = 0; i < map.children.length; i++) {
    map.children[i].classList.remove('zoogeography__mark_active');
  }
  mark.classList.add('zoogeography__mark_active');
}

fdbckBtn.addEventListener('click', togglePopup);
cover.addEventListener('click', togglePopup);
map.addEventListener('click', toggleAnimalCard);