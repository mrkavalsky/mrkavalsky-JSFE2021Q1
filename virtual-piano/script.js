const keys = document.querySelectorAll('.piano-key');
const fullscreen = document.querySelector('.fullscreen');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
let isMouseDown = false;

function playSound(e) {
    const type = e.type;
    let code;

    switch (type) {
        case 'mouseover':
            if(!isMouseDown) return;
            code = e.target.dataset.code;
            break;
        case 'mousedown':
            code = e.target.dataset.code;
            break;
        case 'keydown':
            if(e.repeat) return;
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
    key.classList.remove('piano-key-hover');
}

function toggleMouseMode(e) {
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

function removeClassActive(e) {
    if( e.type == 'keyup') {
        let key = document.querySelector(`.piano-key[data-code="${e.code}"]`);
        if(key === null) return;
        key.classList.remove('active');
        key.classList.add('piano-key-hover');
    } else {
        this.classList.remove('active');
        this.classList.add('piano-key-hover');
    };
}

keys.forEach(key => key.addEventListener('mouseup', removeClassActive));
keys.forEach(key => key.addEventListener('mouseout', removeClassActive));

document.addEventListener('mousedown', playSound);
document.addEventListener('keydown', playSound);
document.addEventListener('mousedown', toggleMouseMode);
document.addEventListener('mouseup', toggleMouseMode);
document.addEventListener('mouseover', playSound);
document.addEventListener('keyup', removeClassActive);

fullscreen.addEventListener('click', setFullScreen);
btnNotes.addEventListener('click', setNotes);
btnLetters.addEventListener('click', setLetter);