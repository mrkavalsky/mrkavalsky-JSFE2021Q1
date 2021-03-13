const keys = document.querySelectorAll('.piano-key');

function removeTransition(e) {
    if(e.propertyName == 'transform')
    this.classList.remove('active');
}

function playSound(e) {
    const note = e.target.dataset.note;
    const audio = document.querySelector(`audio[data-note="${note}"]`);
    const key = document.querySelector(`.piano-key[data-note="${note}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('active');
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition));
document.addEventListener('click', playSound);