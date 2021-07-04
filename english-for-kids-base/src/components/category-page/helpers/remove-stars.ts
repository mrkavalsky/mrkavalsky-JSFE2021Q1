export const removeStars = (): void => {
  const score = document.getElementById('score');

  if (score) {
    score.innerHTML = '';
  }
};
