document.addEventListener('click', function (e) {
    const note = e.target.dataset.note;
    const audio = document.querySelector(`audio[data-note="${note}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
});