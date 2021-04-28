const backgroundMap = document.querySelector('.background-map');
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

function showAnimalCard(e) {
  const mark = e.target.closest('.background-map__mark');
  if (!mark) return;
  const pos = mark.dataset.pos;
  mark.appendChild(getAnimalCard(pos));
  for (let i = 0; i < backgroundMap.children.length; i++) {
    backgroundMap.children[i].classList.remove('background-map__mark_active');
  };
  mark.classList.add('background-map__mark_active');
}

function getAnimalCard(pos) {
  const animalCard = document.createElement('div');
  animalCard.classList.add('background-map__animal');
  animalCard.innerHTML = `
        <img src="${animals[pos].imgSrc}" alt="Animal Photo" class="background-map__animal-photo">
        <div class="background-map__animal-info">
          <h3 class="background-map__h3">${animals[pos].title}</h3>
          <h4 class="background-map__h4">${animals[pos].text}</h4>
          <a href="${animals[pos].linkSrc}" class="background-map__link">Watch now →</a>
        </div>`;
  return animalCard;
}

backgroundMap.addEventListener('click', showAnimalCard);