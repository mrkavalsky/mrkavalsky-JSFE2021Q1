const keys = document.querySelectorAll('.piano-key');
const fullscreen = document.querySelector('.fullscreen');
let isMouseDown = false;

function removeTransition(e) {
    if(e.propertyName == 'transform')
    this.classList.remove('active');
}

function playSound(code) {
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

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

document.addEventListener('click', function(e) {
    const code = e.target.dataset.code;
    playSound(code); 
});
document.addEventListener('keydown', function(e) {
    const code = e.code;
    playSound(code);    
});

fullscreen.addEventListener('click', function(e) {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
document.addEventListener('mousedown', setMouseMode);
document.addEventListener('mouseup', setMouseMode);
document.addEventListener('mouseover', function(e) {
    if(!isMouseDown) return;
    const code = e.target.dataset.code;
    playSound(code);
});
