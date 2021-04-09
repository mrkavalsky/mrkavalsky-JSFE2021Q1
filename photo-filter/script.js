const filters = document.querySelector('.filters');
const resetBtn = document.getElementById('btn-reset');

function handleFilters(input) {
  const suffix = input.dataset.sizing;
  const output = input.nextSibling.nextSibling;
  output.value = input.value;
  document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
}

function resetFilters() {
  const arr = [...filters.children];
  arr.forEach(label => {
    const input = label.children[0];
    input.value = input.defaultValue;
    handleFilters(input);
  });
}

function getInput(e) {
  const input = e.target;
  handleFilters(input);
}

filters.addEventListener('input', getInput);
resetBtn.addEventListener('click', resetFilters);