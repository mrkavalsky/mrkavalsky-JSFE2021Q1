const filters = document.querySelector('.filters');

function handleFilters(e) {
  const inputValue = e.target.value;
  let output = e.target.nextSibling.nextSibling;
  output.value = inputValue;
}

filters.addEventListener('input', handleFilters);