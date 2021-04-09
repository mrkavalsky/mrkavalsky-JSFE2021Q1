const filters = document.querySelector('.filters');

function handleFilters(e) {
  const input = e.target;
  const suffix = input.dataset.sizing;
  const output = e.target.nextSibling.nextSibling;
  output.value = input.value;
  document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
}

filters.addEventListener('input', handleFilters);