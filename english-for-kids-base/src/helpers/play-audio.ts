function PlayAudio() {
  const audio = new Audio();
  return (audioSrc: string) => {
    audio.pause();
    audio.src = audioSrc;
    audio.currentTime = 0;
    audio.play();
  };
}

export const playAudio = PlayAudio();
