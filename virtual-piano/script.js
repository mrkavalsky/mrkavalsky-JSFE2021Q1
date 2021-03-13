const keys = document.querySelectorAll('.piano-key');

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

keys.forEach(key => key.addEventListener('transitionend', removeTransition));
document.addEventListener('click', function(e) {
    const code = e.target.dataset.code;
    playSound(code); 
});
document.addEventListener('keydown', function(e) {
    const code = e.code;
    playSound(code);    
});