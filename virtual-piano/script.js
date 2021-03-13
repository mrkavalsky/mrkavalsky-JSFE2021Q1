const keys = document.querySelectorAll('.piano-key');
const fullscreen = document.querySelector('.fullscreen');
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

function setMouseMode() {
    isMouseDown = !isMouseDown;
}

function setFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

document.addEventListener('click', playSound);
document.addEventListener('keydown', playSound);
fullscreen.addEventListener('click', setFullScreen);
document.addEventListener('mousedown', setMouseMode);
document.addEventListener('mouseup', setMouseMode);
document.addEventListener('mouseover', playSound);