const keys = document.querySelectorAll('.piano-key');
const fullscreen = document.querySelector('.fullscreen');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
let isMouseDown = false;

function removeTransition(e) {
    if(e.propertyName == 'transform')
    this.classList.remove('active');
}

function playSound(e) {
    const type = e.type;
    let code;

    switch (type) {
        case 'mouseover':
            if(!isMouseDown) return;
            code = e.target.dataset.code;
            break;
        case 'click':
            code = e.target.dataset.code;
            break;
        case 'keydown':
            code = e.code;
            break;
        default: return;
    };

    const audio = document.querySelector(`audio[data-code="${code}"]`);
    const key = document.querySelector(`.piano-key[data-code="${code}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('active');
}

function setMouseMode(e) {
    if(e.type == 'mouseup') isMouseDown = false;
    else 
        keys.forEach(key => {
            if(key == e.target) isMouseDown = true;
        });
}

function setFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function setNotes() {
    btnNotes.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');
    keys.forEach(key => key.classList.remove('piano-key-letter'));
}

function setLetter() {
    btnLetters.classList.add('btn-active');
    btnNotes.classList.remove('btn-active');
    keys.forEach(key => key.classList.add('piano-key-letter'));
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

document.addEventListener('click', playSound);
document.addEventListener('keydown', playSound);
fullscreen.addEventListener('click', setFullScreen);
document.addEventListener('mousedown', setMouseMode);
document.addEventListener('mouseup', setMouseMode);
document.addEventListener('mouseover', playSound);
btnNotes.addEventListener('click', setNotes);
btnLetters.addEventListener('click', setLetter);